import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import * as prismic from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import { createClient } from '@/prismicio'
import { components as sliceComponents } from '@/slices'
import AuthorCard from '@/components/blog/AuthorCard'
import PostNavigation from '@/components/blog/PostNavigation'
import { Section, Eyebrow, Icon } from '@/components/ui'
import type { ImageField, LinkField, RichTextField } from '@prismicio/client'

export const revalidate = 3600

const SITE_URL = 'https://www.ohana-surf-morocco.com'


export async function generateMetadata({
  params,
}: {
  params: { uid: string }
}): Promise<Metadata> {
  const client = createClient()
  try {
    const post = await client.getByUID('blog_post', params.uid)
    const data = post.data as Record<string, unknown>

    const baseTitle = Array.isArray(data.title) ? prismic.asText(data.title as RichTextField) : String(data.title ?? '')
    const baseDescription = Array.isArray(data.excerpt) ? prismic.asText(data.excerpt as RichTextField) : String(data.excerpt ?? '')

    const title = (data.seo_title as string | null) || baseTitle
    const description = (data.seo_description as string | null) || baseDescription

    const seoImg = data.seo_image as (ImageField & { dimensions?: { width: number; height: number } }) | null
    const coverImg = data.cover_image as (ImageField & { dimensions?: { width: number; height: number } }) | null
    const img = seoImg?.url ? seoImg : coverImg
    const ogImage = img?.url
      ? {
          url: img.url,
          width: img.dimensions?.width ?? 1200,
          height: img.dimensions?.height ?? 630,
          alt: img.alt ?? title,
        }
      : undefined

    return {
      title,
      description,
      alternates: { canonical: `/blog/${params.uid}` },
      openGraph: {
        url: `/blog/${params.uid}`,
        type: 'article',
        title: `${title} — Ohana Surf Morocco`,
        description,
        publishedTime: (data.publish_date as string) ?? undefined,
        ...(ogImage && { images: [ogImage] }),
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} — Ohana Surf Morocco`,
        description,
        ...(ogImage && { images: [ogImage.url] }),
      },
    }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { uid: string }
}) {
  const client = createClient()
  let post: Awaited<ReturnType<typeof client.getByUID>>

  try {
    post = await client.getByUID('blog_post', params.uid, {
      fetchLinks: [
        'author.name',
        'author.role',
        'author.bio',
        'author.photo',
        'author.instagram',
      ],
    })
  } catch {
    notFound()
  }

  const data = post.data as Record<string, unknown>
  const title = Array.isArray(data.title) ? prismic.asText(data.title as RichTextField) : String(data.title ?? '')
  const excerpt = Array.isArray(data.excerpt) ? prismic.asText(data.excerpt as RichTextField) : String(data.excerpt ?? '')
  const publishDate = (data.publish_date as string | null) ?? null
  const coverImage = data.cover_image as ImageField

  const formattedDate = publishDate
    ? new Date(publishDate).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null

  const authorDoc = data.author as { data?: { name?: string; role?: string; bio?: RichTextField; photo?: ImageField; instagram?: LinkField } } | null
  const hasAuthor = Boolean(authorDoc?.data?.name)

  // Fetch adjacent posts for prev/next navigation
  const allPosts = await client.getAllByType('blog_post', {
    orderings: [{ field: 'my.blog_post.publish_date', direction: 'desc' }],
  })
  const currentIndex = allPosts.findIndex((p) => p.uid === params.uid)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  const toNavPost = (p: typeof allPosts[number] | null) =>
    p
      ? {
          uid: p.uid,
          title: Array.isArray(p.data.title)
            ? prismic.asText(p.data.title as RichTextField)
            : String(p.data.title ?? ''),
        }
      : null

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: excerpt,
    image: (coverImage as { url?: string })?.url,
    datePublished: publishDate ?? undefined,
    author: hasAuthor
      ? { '@type': 'Person', name: authorDoc!.data!.name }
      : { '@type': 'Organization', name: 'Ohana Surf Morocco' },
    publisher: {
      '@type': 'Organization',
      name: 'Ohana Surf Morocco',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/LOGO-color-horizontal.png` },
    },
    url: `${SITE_URL}/blog/${params.uid}`,
  }

  const coverImageUrl = (coverImage as { url?: string })?.url

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <header className="page-header post-page-header">
        {coverImageUrl && (
          <div className="page-header__bg" style={{ backgroundImage: `url('${coverImageUrl}')` }} />
        )}
        <div className="container">
          <Link href="/blog" className="post-back" data-umami-event="blog_back_to_list">
            <Icon name="chevron-left" aria-hidden="true" />
            Return to blog
          </Link>
          <div className="post-page-header__meta">
            {data.category != null && <Eyebrow>{String(data.category)}</Eyebrow>}
            {formattedDate && (
              <time className="post-page-header__date" dateTime={publishDate ?? ''}>
                {formattedDate}
              </time>
            )}
          </div>
          <h1>{title}</h1>
          {excerpt && <p>{excerpt}</p>}
        </div>
      </header>

      <Section>
        <div className="post-layout">
          <SliceZone slices={data.body as prismic.SliceZone} components={sliceComponents} />

          {hasAuthor && authorDoc?.data && (
            <AuthorCard
              name={authorDoc.data.name!}
              role={authorDoc.data.role}
              bio={authorDoc.data.bio}
              photo={authorDoc.data.photo}
              instagram={authorDoc.data.instagram}
            />
          )}

          <PostNavigation prev={toNavPost(prevPost)} next={toNavPost(nextPost)} />
        </div>
      </Section>
    </>
  )
}
