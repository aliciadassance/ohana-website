import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'

export const repositoryName = 'ohana-surf-morocco'

export function createClient() {
  const client = prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    routes: [{ type: 'blog_post', path: '/blog/:uid' }],
  })
  enableAutoPreviews({ client })
  return client
}
