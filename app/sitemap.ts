import type { MetadataRoute } from 'next';
import { COMPANY } from './company';

// Only indexable pages; the legal pages are noindex.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${COMPANY.site}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 }];
}
