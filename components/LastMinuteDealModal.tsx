'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button, Icon } from './ui'

const SESSION_KEY = 'ohana-last-minute-deal-seen'
// stop showing a few days before the offer ends (Oct 31) so guests aren't pitched a stay with no lead time left
const POPUP_CUTOFF = new Date('2026-10-27T00:00:00')

function getDaysLeft(): number {
  const now = new Date()
  const diff = POPUP_CUTOFF.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export default function LastMinuteDealModal() {
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)
  const daysLeft = getDaysLeft()

  useEffect(() => {
    if (new Date() >= POPUP_CUTOFF) return
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
      aria-label="Last-minute deal offer"
    >
      <div className="promo-modal" onClick={e => e.stopPropagation()}>
        <button className="promo-modal__close" onClick={close} aria-label="Close promotion">
          <Icon name="x" size={18} />
        </button>

        <div className="promo-modal__image">
          <Image
            src="/assets/images/booking-hero.jpg"
            alt="Ohana Surf Morocco — book your stay"
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="promo-modal__image-overlay" />
          <div className="promo-modal__image-badges">
            <span className="promo-modal__image-badge">Last-Minute Deal</span>
            <span className="promo-modal__image-badge promo-modal__image-badge--countdown">
              <Icon name="clock" size={12} />
              {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
            </span>
          </div>
        </div>

        <div className="promo-modal__body">
          <span className="eyebrow" style={{ color: 'var(--color-accent)' }}>Limited spots, limited time</span>
          <h2 className="promo-modal__title">
            Last-Minute <span>Deal</span>
          </h2>
          <p className="promo-modal__discount">10% off</p>
          <p className="promo-modal__desc">
            Book any stay of <strong>5 nights or more</strong> between{' '}
            <strong>October 17 &ndash; October 31</strong>. Spots are filling up fast for
            this window &mdash; lock in your discount before it&apos;s gone.
          </p>
          <div className="promo-modal__actions">
            <Button
              variant="primary"
              size="lg"
              iconRight="arrow-right"
              href="/packages"
              onClick={close}
              umamiEvent="last-minute-deal-discover-packages"
            >
              Discover Packages
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/booking"
              onClick={close}
              umamiEvent="last-minute-deal-book-now"
            >
              Book Now
            </Button>
          </div>
          <p className="promo-modal__note">
            Valid for stays of 5+ nights only. The discount will be automatically
            applied when your booking request is submitted.
          </p>
        </div>
      </div>
    </div>
  )
}
