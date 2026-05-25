import type { ReactNode } from 'react'
import { Icon, Eyebrow } from './ui'

type PageHeaderProps = {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  bgImage?: string
  breadcrumb?: string
  titleNoWrap?: boolean
}

export default function PageHeader({ eyebrow, title, intro, bgImage, breadcrumb, titleNoWrap }: PageHeaderProps) {
  return (
    <header className="page-header">
      {bgImage && <div className="page-header__bg" style={{ backgroundImage: `url('${bgImage}')` }} />}
      <div className="container">
        {breadcrumb && (
          <div className="breadcrumb">
            <span>Home</span> <Icon name="chevron-right" /> <span>{breadcrumb}</span>
          </div>
        )}
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 style={titleNoWrap ? { maxWidth: 'none', whiteSpace: 'nowrap' } : undefined}>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </header>
  )
}
