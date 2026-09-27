import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { GA_ID, trackEvent } from '../lib/analytics';
const SITE_URL = 'https://www.scott-brabazon.com';

export default function Analytics() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Keep local development and deployment previews out of production reports.
    if (process.env.NODE_ENV !== 'production' || window.location.origin !== SITE_URL) return;
    setEnabled(true);
    if (!window.__scottAnalyticsReady) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', GA_ID, { send_page_view: false });
      window.__scottAnalyticsReady = true;
    }

    let frame;
    const pageview = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const location = `${SITE_URL}${window.location.pathname}`;
        if (window.__scottLastPageview === location) return;
        let referrer = window.__scottLastPageview || document.referrer;
        if (referrer) {
          try { const parsed = new URL(referrer); referrer = `${parsed.origin}${parsed.pathname}`; }
          catch { referrer = ''; }
        }
        trackEvent('page_view', { page_location: location, page_referrer: referrer, page_title: document.title });
        window.__scottLastPageview = location;
      });
    };
    const contactClick = (event) => {
      const link = event.target.closest?.('a[href]');
      const href = link?.getAttribute('href') || '';
      const method = href.startsWith('mailto:') ? 'email' : href.startsWith('tel:') ? 'phone' : null;
      if (method) trackEvent('contact_click', { contact_method: method, page_path: window.location.pathname });
    };

    pageview();
    router.events.on('routeChangeComplete', pageview);
    document.addEventListener('click', contactClick);
    return () => {
      cancelAnimationFrame(frame);
      router.events.off('routeChangeComplete', pageview);
      document.removeEventListener('click', contactClick);
    };
  }, [router.events]);

  return enabled ? <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" /> : null;
}
