import Link from 'next/link'
import { Icon } from '@/components/ui'

type NavPost = { uid: string; title: string }

type PostNavigationProps = {
  prev: NavPost | null
  next: NavPost | null
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null

  return (
    <nav className="post-nav" aria-label="Post navigation">
      <div className="post-nav__item post-nav__item--prev">
        {prev && (
          <Link href={`/blog/${prev.uid}`} className="post-nav__link">
            <span className="post-nav__label">
              <Icon name="chevron-left" aria-hidden="true" /> Previous
            </span>
            <span className="post-nav__title">{prev.title}</span>
          </Link>
        )}
      </div>
      <div className="post-nav__item post-nav__item--next">
        {next && (
          <Link href={`/blog/${next.uid}`} className="post-nav__link">
            <span className="post-nav__label">
              Next <Icon name="chevron-right" aria-hidden="true" />
            </span>
            <span className="post-nav__title">{next.title}</span>
          </Link>
        )}
      </div>
    </nav>
  )
}
