import { createHash, timingSafeEqual } from 'node:crypto';
import { setTimeout } from 'node:timers/promises';

const portfolioPages = ['/', '/work'];

function hash(value) {
  return createHash('sha256').update(value).digest();
}

async function waitForDelivery(type, action, event) {
  const { CONTENTFUL_SPACE_ID: space, CONTENTFUL_ACCESS_KEY: token } = process.env;
  if (!space || !token) {
    throw new Error('Contentful delivery credentials are missing.');
  }

  const collection = type === 'Entry' ? 'entries' : 'assets';
  const url = `https://cdn.contentful.com/spaces/${encodeURIComponent(space)}/${collection}/${encodeURIComponent(event.id)}?select=sys`;
  const signal = AbortSignal.timeout(6000);

  // The webhook can arrive before the new revision reaches the delivery CDN.
  while (!signal.aborted) {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
      signal,
    });

    if (response.status === 404) {
      if (action === 'unpublish') return;
    } else {
      if (!response.ok) throw new Error(`Contentful delivery returned HTTP ${response.status}.`);
      const { sys } = await response.json();
      const ready = action === 'publish'
        ? sys?.publishedVersion >= event.publishedVersion
        : Date.parse(sys?.updatedAt) > Date.parse(event.deletedAt);
      if (ready) return;
    }

    await setTimeout(350, undefined, { signal });
  }

  throw new Error('Contentful delivery has not caught up with the webhook.');
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST.' });
  }

  const secret = process.env.CONTENTFUL_REVALIDATION_SECRET;
  if (!secret) {
    return res.status(503).json({ error: 'Webhook authentication is not configured.' });
  }

  const authorization = req.headers.authorization;
  if (typeof authorization !== 'string' || !timingSafeEqual(hash(authorization), hash(`Bearer ${secret}`))) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  const topic = /^ContentManagement\.(Entry|Asset)\.(publish|unpublish)$/.exec(req.headers['x-contentful-topic']);
  if (!topic) return res.status(204).end();
  const [, type, action] = topic;

  let event;
  try {
    // Next.js passes Contentful's vendor JSON media type as a string.
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    event = payload?.sys;
  } catch {
    return res.status(400).json({ error: 'Invalid webhook JSON.' });
  }

  if (typeof event?.id !== 'string' || !/^[\w-]+$/.test(event.id) ||
      (action === 'publish' && (!Number.isSafeInteger(event.publishedVersion) || event.publishedVersion < 1))) {
    return res.status(400).json({ error: 'Invalid publication metadata.' });
  }

  try {
    await waitForDelivery(type, action, event);
  } catch {
    return res.status(503).json({ error: 'Unable to confirm the update in Contentful delivery. Retry this event.' });
  }

  const results = await Promise.allSettled(portfolioPages.map(path => res.revalidate(path)));
  const failedPages = portfolioPages.filter((_, index) => results[index].status === 'rejected');
  if (failedPages.length) {
    console.error('Contentful refresh failed for', failedPages.join(', '));
    return res.status(500).json({ error: 'Unable to refresh the portfolio. Retry this event.' });
  }

  return res.status(200).json({ revalidated: portfolioPages });
}
