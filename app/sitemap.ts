import type { MetadataRoute } from 'next';
import { COMPANY } from './company';
import { LANDINGS } from './landings';

// Only indexable pages; the legal pages are noindex.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${COMPANY.site}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...LANDINGS.map(l => ({ url: `${COMPANY.site}/${l.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 })),
  ];
}
