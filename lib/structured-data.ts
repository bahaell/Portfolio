

export function generateWebsiteStructuredData(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BeE',
    description: "A digital workshop where code meets curiosity. Experiments, prototypes, and open-source artifacts by Bahaeddine Ellouze.",
    url: url,
    author: {
      '@type': 'Person',
      name: 'Bahaeddine Ellouze',
      url: 'https://github.com/bahaell',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bahaeddine Ellouze',
    url: 'https://eindev.ir',
    image: 'https://eindev.ir/developer-portrait.png',
    sameAs: [
      'https://github.com/bahaell',
      'https://linkedin.com/in/baha-ellouze',
    ],
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'BeE',
    },
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
