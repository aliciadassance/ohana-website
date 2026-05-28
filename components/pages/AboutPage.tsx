'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import { Icon, Button, Eyebrow, Section, SkeletonImg } from '../ui'
import PageHeader from '../PageHeader'
import CTABanner from '../CTABanner'
import { TEAM, DAY_AT_OHANA } from '@/lib/data'

// House gallery: 2-col on mobile (~50vw cells), 4-col on desktop within a
// half-width split. Day photos: 3-col grid (~33vw mobile) inside a half-width
// column on desktop. Both default to 100vw without this — heavy over-fetch.
const GALLERY_SIZES = '(max-width: 720px) 50vw, (max-width: 1024px) 25vw, 33vw'
const DAY_PHOTO_SIZES = '(max-width: 980px) 50vw, 20vw'

function StoryBlock() {
  return (
    <Section id="story">
      <div className="split">
        <div style={{ position: 'relative' }}>
          <div className="split__media">
            <SkeletonImg src="/assets/images/about-story-2.jpg" alt="A family that surfs together" />
          </div>
          <div className="photo-sticker" style={{ right: '-10px', bottom: '30px' }}>
            <span className="num">2021</span>
            <span>The year<br />Ohana opened</span>
          </div>
        </div>

        <div className="split__copy">
          <Eyebrow>Our story</Eyebrow>
          <h2>A family that surfs together</h2>
          <p>
          Yassin spent years teaching surf lessons in Morocco, making friends in the water and dreading the moment people packed their bags. So he built a place they wouldn't want to leave — Ohana Surf Morocco.
          </p>
          <p>
          Ohana means family in Hawaiian. Turns out, that's not just a name. Guests arrive not knowing anyone and leave with the kind of memories that make home feel a little quieter. Expert coaching, uncrowded lineups, tagine dinners that run long. The part Yassin never gets tired of? Watching someone ride their first wave and break into a smile they can't hide.
          </p>
          <p>
            We stay small on purpose. Twelve guests at a time, max. That&apos;s how we keep things
            personal — and how we keep the lineups uncrowded.
          </p>
        </div>
      </div>
    </Section>
  )
}

const HOUSE_IMAGES = [
  { src: '/assets/images/about-house-1.jpg', alt: 'The house' },
  { src: '/assets/images/about-house-2.jpg', alt: 'The house' },
  { src: '/assets/images/about-house-3.jpg', alt: 'The house' },
  { src: '/assets/images/about-house-4.jpg', alt: 'The house' },
  { src: '/assets/images/about-house-5.jpg', alt: 'The house' },
]

function HouseBlock() {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)
  const [paginationEl, setPaginationEl] = useState<HTMLDivElement | null>(null)

  return (
    <Section id="house" bg="sand">
      <div className="section-head">
        <Eyebrow>The house</Eyebrow>
        <h2>Your home on the Moroccan coast</h2>
        <p>
        The Ohana house sits in Banana Village, a quiet neighbourhood 15km north of Agadir, with the Atlantic right on the doorstep.
        </p>
        <p>Banana Beach is a 10-minute walk. Local shops are closer. The house runs across 4 floors — 6 rooms, 3 bathrooms, and a living room that fits everyone comfortably around the table. Dinners here tend to run long, and game nights even longer.
        </p>
        <p>Head up to the rooftop when the light starts to change. Sea view to the left, mountains to the right. Pick your side.
        </p>
        
      </div>

      <div className="gallery" style={{ marginBottom: '3rem' }}>
        <div><SkeletonImg src="/assets/images/about-house-1.jpg" alt="The house" sizes={GALLERY_SIZES} /></div>
        <div><SkeletonImg src="/assets/images/about-house-2.jpg" alt="The house" sizes={GALLERY_SIZES} /></div>
        <div><SkeletonImg src="/assets/images/about-house-3.jpg" alt="The house" sizes={GALLERY_SIZES} /></div>
        <div><SkeletonImg src="/assets/images/about-house-4.jpg" alt="The house" sizes={GALLERY_SIZES} /></div>
        <div><SkeletonImg src="/assets/images/about-house-5.jpg" alt="The house" sizes={GALLERY_SIZES} /></div>
      </div>

      <div className="gallery-carousel">
        <button ref={setPrevEl} className="carousel__arrow carousel__arrow--light carousel__arrow--prev" aria-label="Previous photo">
          <Icon name="chevron-left" />
        </button>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          slidesPerView={1}
          spaceBetween={0}
          threshold={8}
          navigation={{ prevEl, nextEl }}
          pagination={{
            el: paginationEl,
            clickable: true,
            bulletClass: 'carousel__dot',
            bulletActiveClass: 'is-active',
          }}
          a11y={{ prevSlideMessage: 'Previous photo', nextSlideMessage: 'Next photo' }}
        >
          {HOUSE_IMAGES.map((img) => (
            <SwiperSlide key={img.src}>
              <SkeletonImg src={img.src} alt={img.alt} sizes={GALLERY_SIZES} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button ref={setNextEl} className="carousel__arrow carousel__arrow--light carousel__arrow--next" aria-label="Next photo">
          <Icon name="chevron-right" />
        </button>
        <div ref={setPaginationEl} className="carousel__dots carousel__dots--light" role="tablist" aria-label="House photos" />
      </div>

      <div className="feature-grid">
        <div className="feature">
          <span className="feature__icon"><Icon name="bed" /></span>
          <h3>5 unique rooms</h3>
          <p>Shared, twin, double or balcony room — light, airy, and close enough to the ocean to hear it at night.</p>
        </div>
        <div className="feature">
          <span className="feature__icon"><Icon name="sun" /></span>
          <h3>Rooftop terrace</h3>
          <p>Where breakfast happens, yoga unrolls, and no two sunsets look the same.</p>
        </div>
        <div className="feature">
          <span className="feature__icon"><Icon name="tools-kitchen-2" /></span>
          <h3>Family kitchen</h3>
          <p>Three meals a day from Fatma's kitchen — homemade tagines, fresh couscous, and msemen made from scratch.</p>
        </div>
        <div className="feature">
          <span className="feature__icon"><Icon name="wifi" /></span>
          <h3>Modern comforts</h3>
          <p>Fast Wi-Fi, hot showers, and quiet corners to recharge between sessions.</p>
        </div>
      </div>
    </Section>
  )
}

function DayBlock() {
  return (
    <Section id="day">
      <div className="day-layout">
        <div className="day-layout__left">
          <div className="day-layout__copy">
            <Eyebrow>A day at Ohana</Eyebrow>
            <h2>Surf, eat, rest, repeat</h2>
            <p>
            Welcome to a typical day at Ohana Surf Morocco. Surf sessions in uncrowded Taghazout lineups, Fatma's homemade cooking three times a day, new faces that quickly feel like old friends. <br /><strong>Simple things, done properly — and it never gets old.</strong>
            </p>
          </div>

          <div className="day-layout__photos">
            <div className="photo-placeholder photo-placeholder--tall">
              <SkeletonImg src="/assets/images/about-day-1.png" alt="Mint tea pour at the family table" sizes={DAY_PHOTO_SIZES} />
            </div>
            <div className="photo-placeholder">
              <SkeletonImg src="/assets/images/about-day-2.jpg" alt="Morning surf session" sizes={DAY_PHOTO_SIZES} />
            </div>
            <div className="photo-placeholder">
              <SkeletonImg src="/assets/images/about-day-3.jpg" alt="Brunch at the house" sizes={DAY_PHOTO_SIZES} />
            </div>
            <div className="photo-placeholder photo-placeholder--wide">
              <SkeletonImg src="/assets/images/about-day-4.jpg" alt="Family dinner around the table" sizes={DAY_PHOTO_SIZES} />
            </div>
          </div>

          <div>
            <Button variant="teal" iconRight="arrow-right" href="/booking" umamiEvent="cta_about_book">
              Check availability
            </Button>
          </div>
        </div>

        <div className="day-layout__timeline">
          <div className="timeline">
            {DAY_AT_OHANA.map((item) => (
              <div key={item.time} className="timeline__item">
                <span className="timeline__dot" />
                <div>
                  <div className="timeline__time">{item.time}</div>
                  <h3 className="timeline__title">{item.title}</h3>
                  <p className="timeline__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function TeamBlock() {
  return (
    <Section id="team" bg="sand">
      <div className="section-head">
        <Eyebrow>Meet the team</Eyebrow>
        <h2>The family behind Ohana</h2>
        <p>
        Ohana didn't grow out of a business plan — it grew out of friendship, family and a love for these waves. Meet the team.
        </p>
      </div>
      <div className="team-grid">
        {TEAM.map((m) => (
          <article key={m.name} className="team-member">
            <div className="team-member__photo">
              <SkeletonImg src={m.image} alt={m.name} />
            </div>
            <div>
              <div className="team-member__role">{m.role}</div>
              <h3 className="team-member__name">{m.name}</h3>
              <p className="team-member__bio">{m.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

function MoroccoBlock() {
  const items = [
    { icon: 'map-2', title: 'Aourir & Tamraght', desc: 'The two fishing villages on either side of us. Sleepy, colourful, and surrounded by some of the best surf spots in Morocco.' },
    { icon: 'wave-sine', title: 'Anchor Point', desc: '10 minutes up the coast and one of the most iconic surf breaks in the world. If the swell is right, you\'ll want to be there.' },
    { icon: 'building-mosque', title: 'Souk days', desc: 'Wednesday in Aourir, Sunday in Agadir. Come hungry, come curious — spices, argan oil, fresh produce and things you didn\'t know you needed.' },
    { icon: 'mountain', title: 'Paradise Valley', desc: 'An hour\'s drive inland and a world away. River pools, palm trees, jumping rocks and argan oil bought straight from the women who make it.' },
    { icon: 'sun', title: 'Taghazout', desc: 'The surf village just up the coast that put Morocco on the map. Board shapers, good coffee, and beach bonfires that nobody wants to leave early.' },
    { icon: 'bath', title: 'Hammam & massage', desc: 'Steam, scrub, rosewater. Book one after a big surf day — your shoulders will thank you.' },
    { icon: 'horse', title: 'Camel & horse rides', desc: 'Along the empty beach south of Tamraght as the sun goes down. One of those evenings that sneaks up on you.' },
    { icon: 'sailboat', title: 'Sand dunes excursion', desc: 'Head north past Tamri where the dunes meet the Atlantic. Try your hand at sandboarding, pour a mint tea, and watch the sun drop into the ocean. Hard to beat.' },
  ]

  return (
    <Section id="morocco">
      <div className="section-head">
        <Eyebrow>Life in Morocco</Eyebrow>
        <h2>Beyond the waves</h2>
        <p>
        Morocco is half the magic. On rest days, we'll point you in the right direction — and trust us, there's plenty to find.
        </p>
      </div>
      <div className="morocco-grid">
        {items.map((it) => (
          <div key={it.title} className="morocco-card">
            <span className="morocco-card__icon"><Icon name={it.icon} /></span>
            <h3>{it.title}</h3>
            <p>{it.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About us"
        title={<>The Ohana <em style={{ color: 'var(--brand-orange-300)' }}>family</em></>}
        intro="Six years ago, Yassin made a bet on himself — leave the surf instructor life behind and build something of his own around Taghazout. The idea was simple: create a place where people come for the waves and stay for everything else. It worked."
        bgImage="/assets/images/about-story.jpg"
      />
      <StoryBlock />
      <HouseBlock />
      <DayBlock />
      <TeamBlock />
      <MoroccoBlock />
      <Section>
        <CTABanner
          title="Come live a day at Ohana"
          description="The best way to understand what we do is to spend a morning surfing and an evening eating with us. We're saving you a seat."
          ctaLabel="Plan your trip"
          href="/booking"
          umamiEvent="cta_about_banner"
        />
      </Section>
    </main>
  )
}
