import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.ohana-surf-morocco.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'
  if (!allowIndexing) return []

  const now = new Date()
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/packages`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/booking`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
