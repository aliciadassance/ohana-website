import type { ReactNode } from 'react'
import { Button } from './ui'

type CTABannerProps = {
  title: ReactNode
  description?: string
  ctaLabel?: string
  onCTA?: () => void
}

export default function CTABanner({ title, description, ctaLabel = 'Book Your Stay', onCTA }: CTABannerProps) {
  return (
    <div className="cta-banner">
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <div>
        <Button variant="ink" size="lg" iconRight="arrow-right" onClick={onCTA}>{ctaLabel}</Button>
      </div>
    </div>
  )
}
