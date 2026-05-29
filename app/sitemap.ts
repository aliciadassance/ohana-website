import type { MetadataRoute } from 'next'
import { createClient } from '@/prismicio'

const SITE_URL = 'https://www.ohana-surf-morocco.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'
  if (!allowIndexing) return []

  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/packages`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/booking`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ]

  try {
    const client = createClient()
    const posts = await client.getAllByType('blog_post', {
      fetch: ['blog_post.publish_date'],
      orderings: [{ field: 'my.blog_post.publish_date', direction: 'desc' }],
    })

    const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.uid}`,
      lastModified: post.last_publication_date
        ? new Date(post.last_publication_date)
        : now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    return [...staticRoutes, ...postRoutes]
  } catch {
    return staticRoutes
  }
}
