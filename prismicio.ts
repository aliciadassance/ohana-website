import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'

export const repositoryName = 'ohana-website'

export function createClient() {
  const client = prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    routes: [{ type: 'blog_post', path: '/blog/:uid' }],
    fetchOptions: { next: { tags: ['prismic'] } },
  })
  enableAutoPreviews({ client })
  return client
}
