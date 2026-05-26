import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.ohana-surf-morocco.com'

export default function robots(): MetadataRoute.Robots {
  const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

  if (allowIndexing) {
    return {
      rules: { userAgent: '*', allow: '/' },
      sitemap: `${SITE_URL}/sitemap.xml`,
    }
  }

  return { rules: { userAgent: '*', disallow: '/' } }
}
