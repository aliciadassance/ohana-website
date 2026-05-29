import type { Metadata } from 'next'
import { Suspense } from 'react'
import * as prismic from '@prismicio/client'
import { createClient } from '@/prismicio'
import PageHeader from '@/components/PageHeader'
import PostCard from '@/components/blog/PostCard'
import BlogFilters from '@/components/blog/BlogFilters'
import Pagination from '@/components/blog/Pagination'
import { Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Surf tips, Morocco travel stories, camp life and wellness from the Ohana team in Aourir.',
  alternates: { canonical: '/blog' },
  openGraph: {
    url: '/blog',
    title: 'Blog — Ohana Surf Morocco',
    description: 'Surf tips, Morocco travel stories, camp life and wellness from the Ohana team in Aourir.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Ohana Surf Morocco',
    description: 'Surf tips, Morocco travel stories, camp life and wellness from the Ohana team in Aourir.',
  },
}

const PAGE_SIZE = 9

type SearchParams = {
  page?: string
  category?: string
  month?: string
  q?: string
}

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const client = createClient()
  const page = Math.max(1, Number(searchParams.page ?? 1))
  const category = searchParams.category ?? ''
  const month = searchParams.month ?? ''
  const q = searchParams.q ?? ''

  const filters: string[] = []
  if (category) {
    filters.push(prismic.filter.at('my.blog_post.category', category))
  }
  if (month) {
    const d = new Date(month + '-02')
    filters.push(prismic.filter.dateMonth('my.blog_post.publish_date', d.getMonth() + 1))
    filters.push(prismic.filter.dateYear('my.blog_post.publish_date', d.getFullYear()))
  }
  if (q) {
    filters.push(prismic.filter.fulltext('document', q))
  }

  const [response, allPosts] = await Promise.all([
    client.get({
      filters,
      orderings: [{ field: 'my.blog_post.publish_date', direction: 'desc' }],
      page,
      pageSize: PAGE_SIZE,
      fetchLinks: ['author.name'],
    }),
    client.getAllByType('blog_post', {
      fetch: ['blog_post.publish_date'],
      orderings: [{ field: 'my.blog_post.publish_date', direction: 'desc' }],
    }),
  ])

  const posts = response.results
  const totalPages = response.total_pages

  const availableMonths = Array.from(
    new Set(
      allPosts
        .map((d) => (d.data.publish_date as string | null)?.substring(0, 7))
        .filter((m): m is string => Boolean(m))
    )
  )

  const baseParams = new URLSearchParams()
  if (category) baseParams.set('category', category)
  if (month) baseParams.set('month', month)
  if (q) baseParams.set('q', q)
  const basePath = `/blog${baseParams.toString() ? `?${baseParams.toString()}` : ''}`

  return (
    <>
      <PageHeader
        eyebrow="The Ohana Blog"
        title={<>Stories from <em>the surf</em></>}
        intro="Surf tips, travel guides, camp life and more — straight from Aourir."
        breadcrumb="Blog"
      />

      <Section>
        <Suspense fallback={null}>
          <BlogFilters
            currentCategory={category}
            currentMonth={month}
            currentSearch={q}
            availableMonths={availableMonths}
          />
        </Suspense>

        {posts.length === 0 ? (
          <div className="blog-empty">
            <h3>No posts found</h3>
            <p>Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="post-grid">
            {posts.map((post) => {
              const data = post.data as Record<string, unknown>
              const authorDoc = data.author as { data?: { name?: string } } | null
              return (
                <PostCard
                  key={post.uid}
                  uid={post.uid!}
                  title={prismic.asText(data.title as prismic.RichTextField)}
                  excerpt={prismic.asText(data.excerpt as prismic.RichTextField)}
                  category={(data.category as string) ?? ''}
                  publishDate={(data.publish_date as string) ?? ''}
                  coverImage={data.cover_image as prismic.ImageField}
                  authorName={authorDoc?.data?.name ?? undefined}
                />
              )
            })}
          </div>
        )}

        <Pagination currentPage={page} totalPages={totalPages} basePath={basePath} />
      </Section>
    </>
  )
}
