'use client'

import { useState, useEffect, useRef } from 'react'
import type { ComponentType } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import { Icon, Button, Eyebrow, Section, Badge, Stars, SkeletonImg } from '../ui'
import CTABanner from '../CTABanner'
import { PACKAGES, REVIEWS } from '@/lib/data'
import type { Package } from '@/lib/types'
import blurData from '@/lib/blur-data.json'

const HERO_BLUR = (blurData as Record<string, string>)['/assets/images/hero-poster.jpg']

// Gallery cells render at ~50vw (mobile 2-col) down to ~quarter-width on
// desktop; the default 100vw sizes over-fetches ~2x on the small cells.
const GALLERY_SIZES = '(max-width: 720px) 50vw, (max-width: 1024px) 25vw, 33vw'

type NetworkInformation = {
  saveData?: boolean
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g'
  downlink?: number
}

function shouldLoadHeroVideo(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(max-width: 768px)').matches) return false
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection
  if (conn) {
    if (conn.saveData) return false
    if (conn.effectiveType && ['slow-2g', '2g', '3g'].includes(conn.effectiveType)) return false
    if (typeof conn.downlink === 'number' && conn.downlink < 1.5) return false
  }
  return true
}

// ---- Hero ----
function Hero() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoOk, setVideoOk] = useState(false)
  const [loadVideo, setLoadVideo] = useState(false)

  useEffect(() => {
    if (!shouldLoadHeroVideo()) return
    setLoadVideo(true)
    const t = setTimeout(() => {
      if (videoRef.current && videoRef.current.readyState < 3) setVideoOk(false)
    }, 4000)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="hero">
      <div className={`hero__poster ${videoOk ? 'is-hidden' : ''}`}>
        <Image
          src="/assets/images/hero-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder={HERO_BLUR ? 'blur' : 'empty'}
          blurDataURL={HERO_BLUR}
          style={{ objectFit: 'cover' }}
          aria-hidden="true"
        />
      </div>
      {loadVideo && (
        <video
          ref={videoRef}
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onPlaying={() => setVideoOk(true)}
          onError={() => setVideoOk(false)}
          poster="/assets/images/hero-poster.jpg"
        >
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
      )}
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
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null)

  return (
    <div>
      <div className="pkg-carousel">
        <button ref={setPrevEl} className="carousel__arrow carousel__arrow--light carousel__arrow--prev" aria-label="Previous packages">
          <Icon name="chevron-left" />
        </button>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={20}
          threshold={8}
          slidesPerView={1.08}
          centeredSlides
          breakpoints={{
            720: { slidesPerView: 2, spaceBetween: 20, centeredSlides: false },
            1080: { slidesPerView: 3, spaceBetween: 20, centeredSlides: false },
          }}
          navigation={{ prevEl, nextEl }}
          pagination={{
            el: paginationEl,
            clickable: true,
            bulletClass: 'carousel__dot',
            bulletActiveClass: 'is-active',
          }}
          a11y={{ prevSlideMessage: 'Previous package', nextSlideMessage: 'Next package' }}
          className="pkg-carousel__swiper"
        >
          {PACKAGES.map((pkg) => (
            <SwiperSlide key={pkg.id} className="pkg-carousel__slide">
              {useSurfOnlyCard && SurfOnlyCard && pkg.id === 'surf-only'
                ? <SurfOnlyCard pkg={pkg} onClick={() => router.push('/booking')} />
                : <PackageCard pkg={pkg} onClick={() => router.push('/booking')} />}
            </SwiperSlide>
          ))}
        </Swiper>
        <button ref={setNextEl} className="carousel__arrow carousel__arrow--light carousel__arrow--next" aria-label="Next packages">
          <Icon name="chevron-right" />
        </button>
      </div>
      <div ref={setPaginationEl} className="carousel__dots carousel__dots--light" role="tablist" aria-label="Package pages" />
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
          <div><SkeletonImg src="/assets/images/home-daily-1.jpg" alt="Daily life at Ohana" sizes={GALLERY_SIZES} /></div>
          <div><SkeletonImg src="/assets/images/home-daily-2.jpg" alt="Daily life at Ohana" sizes={GALLERY_SIZES} /></div>
          <div><SkeletonImg src="/assets/images/home-daily-3.jpg" alt="Daily life at Ohana" sizes={GALLERY_SIZES} /></div>
          <div><SkeletonImg src="/assets/images/home-daily-4.jpg" alt="Daily life at Ohana" sizes={GALLERY_SIZES} /></div>
          <div><SkeletonImg src="/assets/images/home-daily-5.jpg" alt="Daily life at Ohana" sizes={GALLERY_SIZES} /></div>
        </div>
      </div>
    </Section>
  )
}

// ---- Reviews ----
function Reviews() {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null)

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
          <button ref={setPrevEl} className="carousel__arrow carousel__arrow--prev" aria-label="Previous reviews">
            <Icon name="chevron-left" />
          </button>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={20}
            threshold={8}
            slidesPerView={1.08}
            centeredSlides
            breakpoints={{
              720: { slidesPerView: 2, spaceBetween: 20, centeredSlides: false },
              1024: { slidesPerView: 3, spaceBetween: 20, centeredSlides: false },
            }}
            navigation={{ prevEl, nextEl }}
            pagination={{
              el: paginationEl,
              clickable: true,
              bulletClass: 'carousel__dot',
              bulletActiveClass: 'is-active',
            }}
            a11y={{ prevSlideMessage: 'Previous review', nextSlideMessage: 'Next review' }}
            className="reviews-carousel__swiper"
          >
            {REVIEWS.map((r) => (
              <SwiperSlide key={r.name} className="reviews-carousel__slide">
                <article className="review">
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
              </SwiperSlide>
            ))}
          </Swiper>
          <button ref={setNextEl} className="carousel__arrow carousel__arrow--next" aria-label="Next reviews">
            <Icon name="chevron-right" />
          </button>
        </div>

        <div ref={setPaginationEl} className="carousel__dots" role="tablist" aria-label="Review pages" />

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem', gap: '0.6rem', flexWrap: 'wrap' }}>
          <Button variant="outline-light" iconLeft="brand-google" href="https://maps.app.goo.gl/xrAbZNEVXHVC1Sr5A">
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
