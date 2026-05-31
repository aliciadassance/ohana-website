import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import { isFilled } from '@prismicio/client'
import { Icon } from '@/components/ui'
import type { ImageField, LinkField, RichTextField } from '@prismicio/client'

type AuthorCardProps = {
  name: string
  role?: string
  bio?: RichTextField
  photo?: ImageField
  instagram?: LinkField
}

export default function AuthorCard({ name, role, bio, photo, instagram }: AuthorCardProps) {
  return (
    <aside className="author-card">
      {isFilled.image(photo) && (
        <div className="author-card__photo">
          <PrismicNextImage field={photo} width={80} height={80} className="author-card__img" />
        </div>
      )}
      <div className="author-card__info">
        {role && <span className="author-card__role">{role}</span>}
        <strong className="author-card__name">{name}</strong>
        {bio && (
          <div className="author-card__bio">
            <PrismicRichText field={bio} />
          </div>
        )}
        {isFilled.link(instagram) && (
          <PrismicNextLink field={instagram} className="author-card__insta" data-umami-event="blog_author_instagram">
            <Icon name="brand-instagram" aria-hidden="true" /> Instagram
          </PrismicNextLink>
        )}
      </div>
    </aside>
  )
}
