import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import * as prismic from '@prismicio/client'
import { SliceZone } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import { createClient } from '@/prismicio'
import { components as sliceComponents } from '@/slices'
import AuthorCard from '@/components/blog/AuthorCard'
import { Section, Badge } from '@/components/ui'
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
    const title = prismic.asText(data.title as RichTextField)
    const description = prismic.asText(data.excerpt as RichTextField)
    const img = data.cover_image as ImageField & { dimensions?: { width: number; height: number } }
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
  const title = prismic.asText(data.title as RichTextField)
  const excerpt = prismic.asText(data.excerpt as RichTextField)
  const publishDate = (data.publish_date as string | null) ?? null
  const coverImage = data.cover_image as ImageField

  const formattedDate = publishDate
    ? new Date(publishDate).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null

  const authorDoc = data.author as { data?: { name?: string; role?: string; bio?: RichTextField; photo?: ImageField; instagram?: LinkField } } | null
  const hasAuthor = Boolean(authorDoc?.data?.name)

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Section>
        <div className="post-layout">
          <header className="post-header">
            <div className="post-header__meta">
              {data.category != null && <Badge variant="teal">{String(data.category)}</Badge>}
              {formattedDate && (
                <time className="post-header__date" dateTime={publishDate ?? ''}>
                  {formattedDate}
                </time>
              )}
            </div>
            <h1 className="post-header__title">{title}</h1>
            {excerpt && <p className="post-header__excerpt">{excerpt}</p>}
          </header>

          {(coverImage as { url?: string })?.url && (
            <div className="post-cover">
              <PrismicNextImage
                field={coverImage}
                priority
                fill
                sizes="(max-width: 768px) 100vw, 760px"
                className="post-cover__img"
              />
            </div>
          )}

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
        </div>
      </Section>
    </>
  )
}
