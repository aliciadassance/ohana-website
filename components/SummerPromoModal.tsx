'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, Icon } from './ui'

const SESSION_KEY = 'ohana-summer-promo-seen'
const EXPIRY = new Date('2026-08-24T00:00:00') // stops showing from Aug 24 (last shown Aug 23)

function getDaysLeft(): number {
  const now = new Date()
  const diff = EXPIRY.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export default function SummerPromoModal() {
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)
  const daysLeft = getDaysLeft()

  useEffect(() => {
    if (new Date() >= EXPIRY) return
    if (sessionStorage.getItem(SESSION_KEY)) return
    const t = setTimeout(() => {
      setVisible(true)
      requestAnimationFrame(() => setAnimating(true))
    }, 3000)
    return () => clearTimeout(t)
  }, [])

  function close() {
    setAnimating(false)
    sessionStorage.setItem(SESSION_KEY, '1')
    setTimeout(() => setVisible(false), 400)
  }

  if (!visible) return null

  return (
    <div
      className={`promo-overlay${animating ? ' is-visible' : ''}`}
      onClick={close}
      role="dialog"
      aria-modal
      aria-label="Summer promo offer"
    >
      <div className="promo-modal" onClick={e => e.stopPropagation()}>
        <button className="promo-modal__close" onClick={close} aria-label="Close promotion">
          <Icon name="x" size={18} />
        </button>

        <div className="promo-modal__image">
          <Image
            src="/assets/images/about-story.jpg"
            alt="Ohana Surf Morocco — summer story"
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="promo-modal__image-overlay" />
          <div className="promo-modal__image-badges">
            <span className="promo-modal__image-badge">Summer 2026</span>
            <span className="promo-modal__image-badge promo-modal__image-badge--countdown">
              <Icon name="clock" size={12} />
              {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
            </span>
          </div>
        </div>

        <div className="promo-modal__body">
          <span className="eyebrow" style={{ color: 'var(--color-accent)' }}>Limited time offer</span>
          <h2 className="promo-modal__title">
            Summer <span>Promo</span>
          </h2>
          <p className="promo-modal__discount">20% off</p>
          <p className="promo-modal__desc">
            All packages for stays during <strong>July & August</strong>.
            Sun, waves, and unforgettable memories await — book now to lock in your discount.
          </p>
          <div className="promo-modal__actions">
            <Button
              variant="primary"
              size="lg"
              iconRight="arrow-right"
              href="/packages"
              onClick={close}
              umamiEvent="summer-promo-discover-packages"
            >
              Discover Packages
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/booking"
              onClick={close}
              umamiEvent="summer-promo-book-now"
            >
              Book Now
            </Button>
          </div>
          <p className="promo-modal__note">
            The discount will be automatically applied when your booking request is submitted.
          </p>
        </div>
      </div>
    </div>
  )
}
