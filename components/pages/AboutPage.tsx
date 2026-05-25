'use client'

import { useRouter } from 'next/navigation'
import { Icon, Button, Eyebrow, Section } from '../ui'
import PageHeader from '../PageHeader'
import CTABanner from '../CTABanner'
import { TEAM, DAY_AT_OHANA } from '@/lib/data'

function StoryBlock() {
  return (
    <Section id="story">
      <div className="split">
        <div style={{ position: 'relative' }}>
          <div className="split__media">
            <img src="/assets/images/about-story-2.jpg" alt="A family that surfs together" />
          </div>
          <div className="photo-sticker" style={{ right: '-10px', bottom: '30px' }}>
            <span className="num">2018</span>
            <span>The year<br />Ohana opened</span>
          </div>
        </div>

        <div className="split__copy">
          <Eyebrow>Our story</Eyebrow>
          <h2>A family that surfs together</h2>
          <p>
            Ohana started simply: Yassin came home from a decade on the international surf
            circuit, looked at his family&apos;s house on the coast, and thought —
            <em> what if we opened the door?</em>
          </p>
          <p>
            What began as a few friends crashing for a swell has grown into a small,
            beloved camp welcoming surfers from all over the world. The mission has never
            changed: share the waves we grew up on, the food we grew up eating, and the
            family we grew up in.
          </p>
          <p>
            We stay small on purpose. Six guests at a time, max. That&apos;s how we keep things
            personal — and how we keep the lineups uncrowded.
          </p>
        </div>
      </div>
    </Section>
  )
}

function HouseBlock() {
  return (
    <Section id="house" bg="sand">
      <div className="section-head">
        <Eyebrow>The house</Eyebrow>
        <h2>Your home on the Moroccan coast</h2>
        <p>
          Five minutes from the beach, on a quiet street in Aourir. A traditional
          Moroccan house with a rooftop terrace, a sun-drenched courtyard, and just
          enough rooms to feel like a real home — not a hotel.
        </p>
      </div>

      <div className="gallery" style={{ marginBottom: '3rem' }}>
        <div><img src="/assets/images/about-house-1.jpg" alt="The house" /></div>
        <div><img src="/assets/images/about-house-2.jpg" alt="The house" /></div>
        <div><img src="/assets/images/about-house-3.jpg" alt="The house" /></div>
        <div><img src="/assets/images/about-house-4.jpg" alt="The house" /></div>
        <div><img src="/assets/images/about-house-5.jpg" alt="The house" /></div>
      </div>

      <div className="feature-grid">
        <div className="feature">
          <span className="feature__icon"><Icon name="bed" /></span>
          <h3>5 unique rooms</h3>
          <p>Shared, twin, double or balcony — all with crisp linens, fans and ocean-cooled air.</p>
        </div>
        <div className="feature">
          <span className="feature__icon"><Icon name="sun" /></span>
          <h3>Rooftop terrace</h3>
          <p>Where breakfast happens, yoga unrolls, and every sunset is the best one yet.</p>
        </div>
        <div className="feature">
          <span className="feature__icon"><Icon name="tools-kitchen-2" /></span>
          <h3>Family kitchen</h3>
          <p>Three meals a day prepared by Fatima — tagines, harira, msemen, fresh fish.</p>
        </div>
        <div className="feature">
          <span className="feature__icon"><Icon name="wifi" /></span>
          <h3>Modern comforts</h3>
          <p>Fast Wi-Fi, hot showers, board room and a quiet nook for digital nomads.</p>
        </div>
      </div>
    </Section>
  )
}

function DayBlock() {
  const router = useRouter()
  return (
    <Section id="day">
      <div className="day-layout">
        <div className="day-layout__left">
          <div className="day-layout__copy">
            <Eyebrow>A day at Ohana</Eyebrow>
            <h2>Surf, eat, rest, repeat</h2>
            <p>
              There&apos;s a rhythm to life here. We move with the swell — early sessions before the
              wind picks up, slow afternoons under the sun, and a sunset session that doubles
              as therapy. In between: incredible food, hammocks, and good company.
            </p>
          </div>

          <div className="day-layout__photos">
            <div className="photo-placeholder photo-placeholder--tall">
              <img src="/assets/images/about-day-1.png" alt="Mint tea pour at the family table" />
            </div>
            <div className="photo-placeholder">
              <img src="/assets/images/about-day-2.jpg" alt="Morning surf session" />
            </div>
            <div className="photo-placeholder">
              <img src="/assets/images/about-day-3.jpg" alt="Brunch at the house" />
            </div>
            <div className="photo-placeholder photo-placeholder--wide">
              <img src="/assets/images/about-day-4.jpg" alt="Family dinner around the table" />
            </div>
          </div>

          <div>
            <Button variant="teal" iconRight="arrow-right" onClick={() => router.push('/booking')}>
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
          Three people, one house, and a deep love for the Moroccan coast.
          You&apos;ll know them all by name on day one.
        </p>
      </div>
      <div className="team-grid">
        {TEAM.map((m) => (
          <article key={m.name} className="team-member">
            <div className="team-member__photo">
              <img src={m.image} alt={m.name} />
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
    { icon: 'map-2', title: 'Aourir & Tamraght', desc: 'Two sleepy fishing villages just north of Agadir, surrounded by some of Morocco\'s best surf.' },
    { icon: 'wave-sine', title: 'Anchor Point', desc: 'The legendary right-hander 10 minutes north — one of the world\'s most iconic point breaks.' },
    { icon: 'building-mosque', title: 'Souk days', desc: 'Wednesday market in Aourir, Sunday market in Agadir — spices, leather, argan oil, all of it.' },
    { icon: 'mountain', title: 'Paradise Valley', desc: 'An hour inland — palm-shaded river pools, jumping rocks, and the best argan oil from local cooperatives.' },
    { icon: 'sun', title: 'Taghazout', desc: 'The legendary surf village 15 minutes up the coast — cafes, board shapers, sundown beach bonfires.' },
    { icon: 'bath', title: 'Hammam & massage', desc: 'A traditional steam, scrub, and rosewater rinse. The cure for sore shoulders after a long surf day.' },
    { icon: 'horse', title: 'Camel & horse rides', desc: 'Sunset rides along the empty beach south of Tamraght — quietly one of the best evenings of the trip.' },
    { icon: 'sailboat', title: 'Sand dunes excursion', desc: 'South to the Sahara fringe — dune walks, mint tea, and skies wide enough to forget what time it is.' },
  ]

  return (
    <Section id="morocco">
      <div className="section-head">
        <Eyebrow>Life in Morocco</Eyebrow>
        <h2>Beyond the waves</h2>
        <p>
          Morocco is half the magic. On rest days we&apos;ll point you to the spice
          souk, hidden beaches, mountain hikes, and the world&apos;s best mint tea.
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
  const router = useRouter()
  return (
    <main>
      <PageHeader
        eyebrow="About us"
        title={<>The Ohana <em style={{ color: 'var(--brand-orange-300)' }}>family</em></>}
        intro="Yassin, his mother Fatima, his cousin Hassan — and you. We're a small, family-run surf camp on the Moroccan coast, sharing the waves and the way of life we grew up with."
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
          onCTA={() => router.push('/booking')}
        />
      </Section>
    </main>
  )
}
