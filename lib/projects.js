const PROJECTS_QUERY = `{
  projectCollection {
    items {
      name
      href
      projectTag
      projectDescription { json }
      img { url }
      featured
      lightboxCollection { items { url } }
    }
  }
}`;

export async function getProjects() {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const token = process.env.CONTENTFUL_ACCESS_KEY;
  if (!space || !token) {
    throw new Error('Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_KEY to load portfolio projects.');
  }

  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${encodeURIComponent(space)}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: PROJECTS_QUERY }),
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Contentful project request failed (HTTP ${response.status}).`);
  }

  const { data, errors } = await response.json();
  const projects = data?.projectCollection?.items;
  if (errors?.length || !Array.isArray(projects) || projects.some(project => typeof project?.name !== 'string')) {
    throw new Error('Contentful returned an invalid or incomplete portfolio project list.');
  }

  return projects.sort((left, right) => {
    const leftName = left.name.toUpperCase();
    const rightName = right.name.toUpperCase();
    if (leftName < rightName) return -1;
    if (leftName > rightName) return 1;
    return 0;
  });
}
