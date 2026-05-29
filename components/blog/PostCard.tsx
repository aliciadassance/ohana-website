import { PrismicNextImage } from '@prismicio/next'
import type { ImageField } from '@prismicio/client'
import { Badge } from '@/components/ui'

type PostCardProps = {
  uid: string
  title: string
  excerpt: string
  category: string
  publishDate: string
  coverImage: ImageField
  authorName?: string
}

export default function PostCard({
  uid, title, excerpt, category, publishDate, coverImage, authorName
}: PostCardProps) {
  const formattedDate = publishDate
    ? new Date(publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <article className="post-card card card--hover">
      <a href={`/blog/${uid}`} className="post-card__media" tabIndex={-1} aria-hidden="true">
        <PrismicNextImage
          field={coverImage}
          className="post-card__img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          fill
        />
      </a>
      <div className="post-card__body">
        <div className="post-card__meta">
          {category && <Badge variant="teal">{category}</Badge>}
          {formattedDate && (
            <time className="post-card__date" dateTime={publishDate}>{formattedDate}</time>
          )}
        </div>
        <h3 className="post-card__title">
          <a href={`/blog/${uid}`} data-umami-event="blog_post_open">{title}</a>
        </h3>
        {excerpt && <p className="post-card__excerpt">{excerpt}</p>}
        {authorName && <span className="post-card__author">{authorName}</span>}
      </div>
    </article>
  )
}
