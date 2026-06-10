import type { ReactNode } from 'react'
import { Icon, Eyebrow } from './ui'

type PageHeaderProps = {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  bgImage?: string
  breadcrumb?: ReactNode
  titleNoWrap?: boolean
  creators?: string
  compact?: boolean
  headerCta?: ReactNode
}

export default function PageHeader({ eyebrow, title, intro, bgImage, breadcrumb, titleNoWrap, creators, compact, headerCta }: PageHeaderProps) {
  return (
    <header className={`page-header${compact ? ' page-header--compact' : ''}`}>
      {bgImage && <div className="page-header__bg" style={{ backgroundImage: `url('${bgImage}')` }} />}
      <div className={`container${headerCta ? ' page-header__container' : ''}`}>
        <div className={headerCta ? 'page-header__content' : undefined}>
          {breadcrumb && (
            <div className="breadcrumb">
              <span>Home</span> <Icon name="chevron-right" /> <span>{breadcrumb}</span>
            </div>
          )}
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 style={titleNoWrap ? { maxWidth: 'none', whiteSpace: 'nowrap' } : undefined}>{title}</h1>
          {creators && <div className="page-header__creators">{creators}</div>}
          {intro && <p>{intro}</p>}
        </div>
        {headerCta && (
          <div className="page-header__cta">
            {headerCta}
          </div>
        )}
      </div>
    </header>
  )
}
