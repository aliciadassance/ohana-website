'use client'

import { useState, useEffect, useRef } from 'react'
import type { ComponentType } from 'react'
import { useRouter } from 'next/navigation'
import { Icon, Button, Eyebrow, Section, Badge, Stars, SkeletonImg } from '../ui'
import CTABanner from '../CTABanner'
import { PACKAGES, REVIEWS } from '@/lib/data'
import type { Package } from '@/lib/types'

// ---- Hero ----
function Hero() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoOk, setVideoOk] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      if (videoRef.current && videoRef.current.readyState < 3) setVideoOk(false)
    }, 4000)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="hero">
      <div
        className={`hero__poster ${videoOk ? 'is-hidden' : ''}`}
        style={{ backgroundImage: "url('/assets/images/hero-poster.jpg')" }}
      />
      <video
        ref={videoRef}
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={() => setVideoOk(true)}
        onError={() => setVideoOk(false)}
        poster="/assets/images/hero-poster.jpg"
      >
        <source src="/assets/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero__overlay" />

      <div className="container hero__content">
        <span className="hero__eyebrow">Surf · Stay · Morocco</span>
        <h1 className="hero__title">
          Come as a stranger, <em>leave as family.</em>
        </h1>
        <p className="hero__sub">
          A small, family-run surf camp on the Moroccan coast. Pro coaching with Yassin,
          home-cooked tagines, sunrise sessions, and waves you&apos;ll be talking about for years.
        </p>
        <div className="hero__cta">
          <Button variant="primary" size="lg" iconRight="arrow-right" onClick={() => router.push('/booking')}>
            Book Your Stay
          </Button>
          <Button variant="outline-light" size="lg" iconLeft="eye" onClick={() => router.push('/packages')}>
            See Packages
          </Button>
        </div>
      </div>

      <div className="hero__info" aria-hidden="false">
        <div className="hero__info-row"><Icon name="map-pin" /><span>Aourir · Agadir</span></div>
        <div className="hero__info-row"><Icon name="calendar" /><span>Open year-round</span></div>
        <div className="hero__info-row"><Icon name="star-filled" /><span>5.0 on Google</span></div>
      </div>

      <a className="hero__scroll" href="#welcome" aria-label="Scroll to content">
        <Icon name="chevron-down" />
      </a>
    </section>
  )
}

// ---- Welcome ----
function Welcome() {
  const router = useRouter()
  return (
    <Section id="welcome">
      <div className="split">
        <div className="split__copy">
          <Eyebrow>Welcome</Eyebrow>
          <h2>The best Moroccan surf experience</h2>
          <p>
            Ohana Surf Morocco is your home for an unforgettable surf experience on the
            beautiful Moroccan coast. Led by pro surfer <strong>Yassin</strong>, our camp offers
            expert coaching and personalized guidance for every level — whether you&apos;re standing
            on a board for the first time or chasing bigger, cleaner waves.
          </p>
          <p>
            We believe surfing is more than a sport: it&apos;s a way of life. As a family-run camp,
            we open our doors and hearts to every guest. Days flow with the rhythm of the ocean —
            early sessions under the rising sun, laughter around shared meals, and sunsets that
            remind you what it means to truly disconnect.
          </p>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <Button variant="teal" iconRight="arrow-right" onClick={() => router.push('/about')}>About the camp</Button>
            <Button variant="primary" iconRight="arrow-right" onClick={() => router.push('/booking')}>Book with us</Button>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div className="split__media split__media--tall">
            <SkeletonImg src="/assets/images/home-welcome.jpg" alt="A morning at Ohana" />
          </div>
          <div className="photo-sticker" style={{ left: '-20px', bottom: '30px' }}>
            <span className="num">200+</span>
            <span>Happy guests<br />this year</span>
          </div>
          <div className="photo-sticker" style={{ right: '-10px', top: '30px' }}>
            <Icon name="award" style={{ color: 'var(--color-accent)', fontSize: '1.4rem' }} />
            <span>Pro coach<br />since 2009</span>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ---- Stat Strip ----
function StatStrip() {
  return (
    <div className="container">
      <div className="stats">
        <div className="stat"><span className="stat__num">12+</span><span className="stat__label">Surf spots nearby</span></div>
        <div className="stat"><span className="stat__num">4</span><span className="stat__label">People max per instructor</span></div>
        <div className="stat"><span className="stat__num">4.9</span><span className="stat__label">Average rating</span></div>
        <div className="stat"><span className="stat__num">25+</span><span className="stat__label">Countries hosted</span></div>
        <div className="stat"><span className="stat__num">7</span><span className="stat__label">Years welcoming you</span></div>
      </div>
    </div>
  )
}

// ---- Package card (shared) ----
export function PackageCard({ pkg, onClick }: { pkg: Package; onClick: () => void }) {
  return (
    <article className={`card card--hover pkg ${pkg.featured ? 'pkg--featured' : ''}`}>
      <div className="pkg__media">
        <Badge variant={pkg.tagVariant}>{pkg.tag}</Badge>
        <SkeletonImg src={pkg.image} alt={pkg.name} loading="lazy" />
      </div>
      <div className="pkg__body">
        <div>
          <h3 className="pkg__title">{pkg.name}</h3>
          <div className="pkg__sub" style={{ marginTop: '0.25rem' }}>
            <Icon name="calendar-week" /> &nbsp;{pkg.duration}
          </div>
        </div>
        <p className="pkg__sub">{pkg.sub}</p>
        <ul className="pkg__features">
          {pkg.features.slice(0, 4).map((f) => (
            <li key={f}><Icon name="check" /><span>{f}</span></li>
          ))}
        </ul>
        <div className="pkg__price">
          <span className="pkg__price__from">From</span>
          <span className="pkg__price__num">€{pkg.priceFrom}</span>
          <span className="pkg__price__unit">{pkg.priceUnit}</span>
        </div>
        <Button variant="ink" fullWidth iconRight="arrow-right" onClick={onClick} className="pkg__cta">
          Book this package
        </Button>
      </div>
    </article>
  )
}

// ---- Packages carousel (shared with packages page) ----
export function PackagesCarousel({ useSurfOnlyCard = false, SurfOnlyCard }: {
  useSurfOnlyCard?: boolean
  SurfOnlyCard?: ComponentType<{ pkg: Package; onClick: () => void }>
}) {
  const router = useRouter()
  const [active, setActive] = useState(0)
  const [perPage, setPerPage] = useState(3)

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth
      setPerPage(w < 720 ? 1 : w < 1080 ? 2 : 3)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const pages = Math.max(1, PACKAGES.length - perPage + 1)
  const safeActive = Math.min(active, pages - 1)
  const next = () => setActive((a) => (a + 1) % pages)
  const prev = () => setActive((a) => (a - 1 + pages) % pages)

  return (
    <div>
      <div className="pkg-carousel">
        <button className="carousel__arrow carousel__arrow--light carousel__arrow--prev" aria-label="Previous packages" onClick={prev}>
          <Icon name="chevron-left" />
        </button>
        <div className="pkg-carousel__viewport">
          <div
            className="pkg-carousel__track"
            style={{
              transform: `translateX(calc(${-safeActive} * (100% / ${perPage})))`,
              gridTemplateColumns: `repeat(${PACKAGES.length}, calc((100% - ${(perPage - 1) * 1.25}rem) / ${perPage}))`,
            }}
          >
            {PACKAGES.map((pkg) =>
              useSurfOnlyCard && SurfOnlyCard && pkg.id === 'surf-only'
                ? <SurfOnlyCard key={pkg.id} pkg={pkg} onClick={() => router.push('/booking')} />
                : <PackageCard key={pkg.id} pkg={pkg} onClick={() => router.push('/booking')} />
            )}
          </div>
        </div>
        <button className="carousel__arrow carousel__arrow--light carousel__arrow--next" aria-label="Next packages" onClick={next}>
          <Icon name="chevron-right" />
        </button>
      </div>
      <div className="carousel__dots carousel__dots--light" role="tablist" aria-label="Package pages">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === safeActive}
            aria-label={`Show packages ${i + 1}`}
            className={`carousel__dot ${i === safeActive ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  )
}

// ---- Packages preview ----
function PackagesPreview() {
  const router = useRouter()
  return (
    <Section id="packages-preview" bg="sand">
      <div className="section-head">
        <Eyebrow>Surf packages</Eyebrow>
        <h2>Choose your stay, ride with the Ohana family</h2>
        <p>
          Four ways to surf with us — pick the one that fits your trip. Every package includes
          coaching, equipment and the warmest welcome on the Moroccan coast.
        </p>
      </div>
      <PackagesCarousel />
      <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <Button variant="teal" size="lg" iconRight="arrow-right" onClick={() => router.push('/packages')}>
          Compare all packages
        </Button>
      </div>
    </Section>
  )
}

// ---- Daily life ----
function DailyLife() {
  const router = useRouter()
  return (
    <Section>
      <div className="split split--reverse">
        <div className="split__copy">
          <Eyebrow>Daily life</Eyebrow>
          <h2>A day at Ohana feels longer in the best way</h2>
          <p>
            Wake up with the swell, breakfast on the rooftop, two surf sessions in
            untouched lineups, an afternoon nap to a soundtrack of waves, then a
            tagine dinner that turns into stories until the stars come out.
          </p>
          <p>
            No rush. No crowds. Just you, the ocean, and a family that&apos;s already
            saving you a seat at the table.
          </p>
          <Button variant="teal" iconRight="arrow-right" onClick={() => router.push('/about')}>
            See a day at Ohana
          </Button>
        </div>

        <div className="gallery">
          <div><SkeletonImg src="/assets/images/home-daily-1.jpg" alt="Daily life at Ohana" /></div>
          <div><SkeletonImg src="/assets/images/home-daily-2.jpg" alt="Daily life at Ohana" /></div>
          <div><SkeletonImg src="/assets/images/home-daily-3.jpg" alt="Daily life at Ohana" /></div>
          <div><SkeletonImg src="/assets/images/home-daily-4.jpg" alt="Daily life at Ohana" /></div>
          <div><SkeletonImg src="/assets/images/home-daily-5.jpg" alt="Daily life at Ohana" /></div>
        </div>
      </div>
    </Section>
  )
}

// ---- Reviews ----
function Reviews() {
  const [active, setActive] = useState(0)
  const [perPage, setPerPage] = useState(3)

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth
      setPerPage(w < 720 ? 1 : w < 1024 ? 2 : 3)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const pages = Math.max(1, REVIEWS.length - perPage + 1)
  const safeActive = Math.min(active, pages - 1)
  const next = () => setActive((a) => (a + 1) % pages)
  const prev = () => setActive((a) => (a - 1 + pages) % pages)

  return (
    <section className="reviews section">
      <div className="container">
        <div className="section-head" style={{ maxWidth: '720px' }}>
          <Eyebrow>Guest stories</Eyebrow>
          <h2>What our family says about us</h2>
          <p>
            More than 200 guests visited Ohana this year alone. Here&apos;s what a few of them
            have to say about a week on the Moroccan coast with Yassin and the team.
          </p>
        </div>

        <div className="carousel">
          <button className="carousel__arrow carousel__arrow--prev" aria-label="Previous reviews" onClick={prev}>
            <Icon name="chevron-left" />
          </button>
          <div className="carousel__viewport">
            <div
              className="carousel__track"
              style={{
                transform: `translateX(calc(${-safeActive} * (100% / ${perPage})))`,
                gridTemplateColumns: `repeat(${REVIEWS.length}, calc((100% - ${(perPage - 1) * 1.25}rem) / ${perPage}))`,
              }}
            >
              {REVIEWS.map((r) => (
                <article key={r.name} className="review">
                  <div className="review__quote">&ldquo;</div>
                  <Stars count={r.stars} />
                  <p className="review__text">{r.text}</p>
                  <div className="review__meta">
                    <div className="review__avatar">{r.name[0]}</div>
                    <div>
                      <div className="review__name">{r.name}</div>
                      <div className="review__loc">{r.location} · {r.level} surfer</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <button className="carousel__arrow carousel__arrow--next" aria-label="Next reviews" onClick={next}>
            <Icon name="chevron-right" />
          </button>
        </div>

        <div className="carousel__dots" role="tablist" aria-label="Review pages">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === safeActive}
              aria-label={`Show reviews ${i + 1}`}
              className={`carousel__dot ${i === safeActive ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem', gap: '0.6rem', flexWrap: 'wrap' }}>
          <Button variant="outline-light" iconLeft="brand-google" href="https://www.google.com/maps">
            Read on Google
          </Button>
          <Button variant="outline-light" iconLeft="brand-instagram" href="https://www.instagram.com/ohana_surfmorocco/">
            Find us on Instagram
          </Button>
        </div>
      </div>
    </section>
  )
}

// ---- Final CTA ----
function FinalCTA() {
  const router = useRouter()
  return (
    <Section>
      <CTABanner
        title="Ready to come ride with us?"
        description="Tell us when you'd like to come, who's coming with you, and what kind of waves you're chasing. We'll be in touch within 24 hours with a tailored quote."
        ctaLabel="Start your booking"
        onCTA={() => router.push('/booking')}
      />
    </Section>
  )
}

// ---- Home page ----
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Welcome />
      <StatStrip />
      <PackagesPreview />
      <DailyLife />
      <Reviews />
      <FinalCTA />
    </main>
  )
}
