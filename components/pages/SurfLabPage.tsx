import Image from 'next/image'
import { Icon, Button, Eyebrow, Section, SkeletonImg } from '../ui'
import PageHeader from '../PageHeader'
import SurfLabRoomsCarousel from '../SurfLabRoomsCarousel'
import { ROOMS } from '@/lib/data'

const SURF_LAB_BREADCRUMB = (
  <>
    <a href="/packages" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.8 }}>Surf Packages</a>
    {' '}<span style={{ opacity: 0.5 }}>›</span>{' '}
    Surf Lab
  </>
)

// ── Stat strip ──────────────────────────────────────────────────
function StatStrip() {
  const stats = [
    { value: '7',        label: 'days immersed' },
    { value: 'Dec 5–12', label: '2026' },
    { value: '11',       label: 'spots available max' },
    { value: 'From 580€', label: 'per person' },
  ]
  return (
    <div className="sl-stat-strip">
      {stats.map((s) => (
        <div key={s.label} className="sl-stat-strip__item">
          <span className="sl-stat-strip__value">{s.value}</span>
          <span className="sl-stat-strip__label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

// ── 1. The Concept ──────────────────────────────────────────────
function SectionConcept() {
  return (
    <>
      <div className="section-head">
        <Eyebrow>The Concept</Eyebrow>
        <h2>Stop surfing more.<br /><em style={{ color: 'var(--brand-orange-300)', fontStyle: 'normal' }}>Start surfing better.</em></h2>
        <p className="section-body">
          We built Surf Lab because every surfer deserves more than just a good time in the water.
          We believe in real progression — the kind you feel in your body, see in the footage, and carry back home.
          A week where every session, every drill, every conversation points in the same direction: making you a better surfer.
        </p>
      </div>

      {/* Two pillars */}
      <div className="sl-two-pillars">
        <div className="sl-concept-card sl-concept-card--dark sl-concept-card--has-img">
          <div className="sl-concept-card__img">
            <Image src="/assets/images/SURFLAB-Image-Concept-Pillar1.jpg" alt="Surf coaching session in the water" fill sizes="(max-width: 720px) 100vw, 50vw" />
          </div>
          <div className="sl-concept-card__content">
            <div className="sl-concept-card__pill">Pillar 01</div>
            <h3 className="sl-concept-card__title">
              Read the ocean.<br />
              <em>Ride it better.</em>
            </h3>
            <p className="sl-concept-card__body">
              Yassin and the Ohana team know these waters like the back of their hand.
              Every morning we read the conditions and take you to the right spot — so you spend more time on waves and less time guessing.
            </p>
            <p className="sl-concept-card__body">
              Every session is filmed. You&apos;ll watch the footage with your coach, pinpoint exactly what to work on, and go back out and do it better.
              Seeing yourself surf changes everything.
            </p>
            <div className="sl-concept-tags">
              <span className="sl-concept-tag">Surf guiding</span>
              <span className="sl-concept-tag">Coaching</span>
              <span className="sl-concept-tag">Video analysis</span>
            </div>
          </div>
        </div>

        <div className="sl-concept-card sl-concept-card--light sl-concept-card--has-img">
          <div className="sl-concept-card__img">
            <Image src="/assets/images/SURFLAB-Image-Concept-pillar2.jpg" alt="Surf-specific training and mobility session" fill sizes="(max-width: 720px) 100vw, 50vw" />
          </div>
          <div className="sl-concept-card__content">
            <div className="sl-concept-card__pill sl-concept-card__pill--teal">Pillar 02</div>
            <h3 className="sl-concept-card__title sl-concept-card__title--dark">
              Train smart.<br />
              <em style={{ color: 'var(--brand-teal-500)' }}>Surf stronger.</em>
            </h3>
            <p className="sl-concept-card__body sl-concept-card__body--dark">
              Beyond the sessions in the water, this week is a chance to discover specific exercises,
              mobility routines, and stretching protocols tailored to surfers. Every session is designed
              to help you recover better, move more freely, and prevent injuries.
            </p>
            <p className="sl-concept-card__body sl-concept-card__body--dark">
              You leave with a real toolkit: understanding why this work matters, what it looks like
              in practice, and how to keep it up when you&apos;re back home.
            </p>
            <div className="sl-concept-tags">
              <span className="sl-concept-tag sl-concept-tag--teal">Functional training</span>
              <span className="sl-concept-tag sl-concept-tag--teal">Mobility</span>
              <span className="sl-concept-tag sl-concept-tag--teal">Stretching</span>
            </div>
          </div>
        </div>
      </div>

      {/* When & Where */}
      <div className="sl-info-tiles">
        <div className="sl-info-tile">
          <div className="sl-info-tile__icon">
            <Icon name="calendar-week" />
          </div>
          <div>
            <div className="sl-info-tile__label">When</div>
            <div className="sl-info-tile__title">December 5–12, 2026</div>
            <p className="sl-info-tile__body">
              Early December sits in a sweet spot within the peak season — the Atlantic is firing consistent groundswells, the sun is still warm, and the lineups are quieter than they'll be a few weeks later. Less people, more waves, better sessions.
            </p>
          </div>
        </div>
        <div className="sl-info-tile">
          <div className="sl-info-tile__icon">
            <Icon name="map-pin" />
          </div>
          <div>
            <div className="sl-info-tile__label">Where</div>
            <div className="sl-info-tile__title">Aourir, Morocco</div>
            <p className="sl-info-tile__body">
              Based at the Ohana surf house, 10 minutes from Taghazout. Shared meals, ocean views,
              a crew of people who love surfing as much as you do. You arrive as guests. You leave as family.
            </p>
          </div>
        </div>
      </div>

      {/* Concept CTA */}
      <div className="sl-section-cta">
        <Button variant="primary" size="lg" iconRight="arrow-right" href="/booking?interest=surf-lab" umamiEvent="cta_surf_lab_concept">
          Book Now — Secure Your Spot
        </Button>
        <a href="/packages" className="sl-text-link">
          <Icon name="layout-grid" /> Browse all packages
        </a>
      </div>
    </>
  )
}

// ── Photo strip ─────────────────────────────────────────────────
function PhotoStrip() {
  const photos = [
    { src: '/assets/images/home-daily-1.jpg',                           alt: 'Surfer on a wave' },
    { src: '/assets/images/SURFLAB-Image-Whatsincluded-image2.jpg',     alt: 'What\'s included in the Surf Lab week' },
    { src: '/assets/images/SURFLAB-Image-Whatsinthepackage-Image3.jpg', alt: 'Inside the Surf Lab package' },
  ]
  return (
    <div className="sl-photo-strip">
      {photos.map((p) => (
        <div key={p.src} className="sl-photo-strip__item">
          <Image src={p.src} alt={p.alt} fill style={{ objectFit: 'cover' }} sizes="33vw" />
        </div>
      ))}
    </div>
  )
}

// ── 2. What's included ──────────────────────────────────────────
function SectionIncluded() {
  const pillars = [
    { num: '01', icon: 'compass',      title: 'Surf guiding & coaching',      desc: 'Depending on what you need most, we dial in the right approach — whether guided sessions to the best spots with real-time feedback, or focused coaching to sharpen technique. Some days both.',                          tag: 'Daily · adapted to you' },
    { num: '02', icon: 'camera',       title: 'Video & photo analysis',        desc: 'Every session captured on camera. You sit down with your coach, watch the footage, and pinpoint exactly what to work on. Seeing yourself surf changes everything.',                                                     tag: 'Every session' },
    { num: '03', icon: 'barbell',      title: 'Training your body for surfing', desc: 'Specific exercises, mobility routines, and stretching protocols designed for surfers. Recover better, move more freely, and leave with a programme you can keep doing at home.',                                       tag: 'Daily · train smarter' },
    { num: '04', icon: 'skateboarding', title: 'Surfskate sessions',            desc: 'At the skatepark or on open ground — surfskate is a great time and a powerful complement to your surfing. Feel turns and flow on land that carries right back into the ocean.',                                        tag: 'During the week · pure fun' },
  ]

  const extras = [
    { icon: 'bed',              title: 'Accommodation of your choice',  desc: 'Shared room, twin, or private — pick what suits you. All rooms are in the Ohana surf house, right where the action is.',                                                  tag: '7 nights · your pick',    highlight: false },
    { icon: 'tools-kitchen-2',  title: 'Every delicious, homemade meal', desc: 'Breakfast, lunch, and dinner — all included, all made with love. Fresh Moroccan flavours, hearty fuel for big surf days.',                                                   tag: '3 meals a day · homemade', highlight: false },
    { icon: 'bulb',             title: 'Your roadmap to take home',      desc: 'Theory sessions, wave reading workshops, performance talks — the extra layer that turns a good week into a lasting shift.',                                                    tag: 'Bonus · evenings',         highlight: true  },
  ]

  return (
    <>
      <div className="section-head" style={{ color: 'white' }}>
        <span className="eyebrow" style={{ color: 'var(--brand-orange-300)' }}>What&apos;s Included</span>
        <h2 style={{ color: 'white' }}>A full week, fully loaded.</h2>
        <p style={{ color: 'rgba(255,255,255,0.65)' }}>Every day shaped around getting better — in the water, out of the water, and in your head.</p>
      </div>

      {/* Core 4 pillars — 2×2 grid */}
      <div className="sl-inc-pillars">
        {pillars.map((p) => (
          <div key={p.num} className="sl-inc-pillar">
            <div className="sl-inc-pillar__top">
              <span className="sl-inc-pillar__num">{p.num}</span>
              <span className="sl-inc-pillar__icon"><Icon name={p.icon} /></span>
            </div>
            <div className="sl-inc-pillar__title">{p.title}</div>
            <div className="sl-inc-pillar__desc">{p.desc}</div>
            <span className="sl-inc-tag">{p.tag}</span>
          </div>
        ))}
      </div>

      {/* Support extras — 3-col row */}
      <div className="sl-inc-extras">
        {extras.map((e) => (
          <div key={e.title} className={`sl-inc-extra${e.highlight ? ' sl-inc-extra--highlight' : ''}`}>
            <div className="sl-inc-extra__icon"><Icon name={e.icon} /></div>
            <div className="sl-inc-extra__title">{e.title}</div>
            <div className="sl-inc-extra__desc">{e.desc}</div>
            <span className="sl-inc-tag">{e.tag}</span>
          </div>
        ))}
      </div>
    </>
  )
}

// ── 3. Who is it for ────────────────────────────────────────────
function SectionWhoFor() {
  const criteria = [
    { text: 'Surf autonomously and feel comfortable in the lineup' },
    { text: 'Intermediate to advanced — comfortable in 1–1.5m+ waves' },
    { text: 'Want to understand your surfing, not just enjoy it' },
    { text: 'Open to training, honest feedback, and pushing harder' },
    { text: 'Looking for more than a holiday — you want something real' },
    { text: 'Love the idea of a small crew and shared meals by the ocean' },
  ]
  return (
    <>
      <div className="section-head">
        <Eyebrow>Who Is It For</Eyebrow>
        <h2>For <em style={{ color: 'var(--brand-teal-500)', fontStyle: 'normal' }}>intermediate</em> and <em style={{ color: 'var(--brand-teal-500)', fontStyle: 'normal' }}>advanced</em> surfers ready to go further.</h2>
      </div>

      <div className="sl-forwho-inner">
        {/* Left — image + intro */}
        <div className="sl-forwho-left">
          <div className="sl-forwho-banner">
            <SkeletonImg
              src="/assets/images/SURFLAB-Image-Whoisitfor.jpg"
              alt="Intermediate and advanced surfers in the lineup"
              loading="lazy"
            />
          </div>
          <p className="sl-forwho-intro">
            Surf Lab is built for surfers who can already read a lineup and are hungry to break through their ceiling — <strong>intermediate</strong> or <strong>advanced</strong>, looking to sharpen technique, build athleticism, and surf smarter.
          </p>
          <p className="sl-forwho-intro">
            If you&apos;ve been surfing a while and feel like something&apos;s missing — power, flow, consistency, or confidence in bigger surf — this week is for you.
          </p>
        </div>

        {/* Right — criteria card */}
        <div className="sl-level-card">
          <div className="sl-level-badges">
            <span className="sl-level-badge sl-level-badge--teal">Intermediate</span>
            <span className="sl-level-badge sl-level-badge--ink">Advanced</span>
          </div>
          <div className="sl-level-card__title">You&apos;ll fit right in if you…</div>
          <ul className="sl-level-list">
            {criteria.map((c) => (
              <li key={c.text}>{c.text}</li>
            ))}
          </ul>
          <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
            <Button variant="teal" size="md" iconRight="arrow-right" href="/booking?interest=surf-lab" umamiEvent="cta_surf_lab_who">
              I&apos;m in — Book Now
            </Button>
            <a href="/about" className="sl-text-link" style={{ fontSize: 'var(--fs-xs)' }}>
              <Icon name="users" /> Meet the coaches first
            </a>
          </div>
        </div>
      </div>

      {/* Beginner redirect */}
      <div className="sl-not-ready">
        <div className="sl-not-ready__icon">
          <Icon name="wave-sine" size={28} />
        </div>
        <div className="sl-not-ready__body">
          <div className="sl-not-ready__title">Still building your confidence?</div>
          <p className="sl-not-ready__text">
            Surf Lab isn&apos;t the right fit if you&apos;re a beginner or early intermediate. But we have packages for every level — guided sessions, beginner-friendly coaching, and the same warm Ohana welcome.
          </p>
        </div>
        <div className="sl-not-ready__cta">
          <Button variant="outline" size="md" iconRight="arrow-right" href="/packages" umamiEvent="cta_surf_lab_beginner_redirect">
            See all packages
          </Button>
        </div>
      </div>
    </>
  )
}

// ── 4. Pricing & Availability ───────────────────────────────────
function SectionPricing() {
  return (
    <>
      <div className="section-head" style={{ color: 'white' }}>
        <span className="eyebrow" style={{ color: 'var(--brand-orange-300)' }}>Pricing &amp; Availability</span>
        <h2 style={{ color: 'white' }}>Choose your room.<br /><em style={{ color: 'var(--brand-orange-300)', fontStyle: 'normal' }}>Same week, same experience.</em></h2>
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>
          Pick the accommodation that suits you best. The Surf Lab coaching add-on is priced separately — enquire for your week.
        </p>
      </div>

      <SurfLabRoomsCarousel />

      <div className="sl-pricing-notes">
        <div className="sl-pricing-note">
          <span className="sl-pricing-note__icon"><Icon name="clock" /></span>
          <div>
            <div className="sl-pricing-note__title">First come, first served</div>
            <p className="sl-pricing-note__body">Rooms are allocated in order of booking. Coming with someone? Let us know when you enquire and we'll do our best to place you together.</p>
          </div>
        </div>
        <div className="sl-pricing-note">
          <span className="sl-pricing-note__icon"><Icon name="plane" /></span>
          <div>
            <div className="sl-pricing-note__title">Airport transfers</div>
            <p className="sl-pricing-note__body">Not included in the package. Shared transfers from Agadir airport can be arranged and split among the group — just mention it when you enquire.</p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Button variant="primary" size="lg" iconRight="arrow-right" href="/booking?interest=surf-lab" umamiEvent="cta_surf_lab_pricing">
          Enquire about Surf Lab
        </Button>
      </div>
    </>
  )
}

// ── 5. Who is behind ────────────────────────────────────────────
function SectionBehind() {
  const partners = [
    {
      name: 'Ohana Surf Morocco',
      image: '/assets/images/SURFLAB-Image-Whoisbehind-Image1.jpg',
      desc: 'A family-run surf house in Aourir, led by Yassin — one of the most respected coaches on the Moroccan coast. Years of local knowledge, secret spots, and a gift for making real progress feel natural. You come as strangers. You leave as family.',
      tag: 'Surf coaching & guiding · Local expertise',
      instagram: 'https://www.instagram.com/ohana_surf_morocco',
      handle: '@ohana_surf_morocco',
    },
    {
      name: 'Club FER Landes',
      image: '/assets/images/SURFLAB-Image-Whoisbehind-Image2.jpg',
      desc: 'Specialists in surf-specific physical preparation — functional training, mobility, injury prevention, and athletic performance. The missing link between the gym and the lineup.',
      tag: 'Physical preparation · Surf performance',
      instagram: 'https://www.instagram.com/clubferlandes',
      handle: '@clubferlandes',
    },
  ]
  return (
    <>
      <div className="section-head">
        <Eyebrow>Who Is Behind the Surf Lab</Eyebrow>
        <h2>Two teams.<br /><em style={{ color: 'var(--brand-teal-500)', fontStyle: 'normal' }}>One obsession.</em></h2>
        <p>Experts in their domain, united by a simple idea: that surfers deserve better coaching than they usually get.</p>
      </div>

      <div className="sl-partners-grid">
        {partners.map((p) => (
          <div key={p.name} className="sl-partner-card">
            <div className="sl-partner-card__photo">
              {p.image ? (
                <Image src={p.image} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 720px) 100vw, 50vw" />
              ) : (
                <div className="sl-partner-card__photo-placeholder">
                  <Icon name="camera" />
                  <span>Photo coming soon</span>
                </div>
              )}
            </div>
            <div className="sl-partner-card__name">{p.name}</div>
            <a href={p.instagram} target="_blank" rel="noopener noreferrer" className="sl-partner-card__instagram">
              <Icon name="brand-instagram" /> {p.handle}
            </a>
            <p className="sl-partner-card__desc">{p.desc}</p>
            <div className="sl-partner-card__tag">{p.tag}</div>
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div className="sl-final-cta">
        <h3 className="sl-final-cta__title">Ready to make this your best surf week yet?</h3>
        <p className="sl-final-cta__body">Only 11 spots available per edition. Once they&apos;re gone, they&apos;re gone.</p>
        <div className="sl-final-cta__actions">
          <Button variant="primary" size="lg" iconRight="arrow-right" href="/booking?interest=surf-lab" umamiEvent="cta_surf_lab_final">
            Book Now
          </Button>
          <a href="/about" className="sl-text-link">
            <Icon name="users" /> About Ohana
          </a>
          <a href="/packages" className="sl-text-link">
            <Icon name="layout-grid" /> All packages
          </a>
        </div>
      </div>
    </>
  )
}

// ── Page ────────────────────────────────────────────────────────
export default function SurfLabPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Surf Lab"

        title={<>The Surf Lab<br /><em>Train Hard. Surf Better.</em></>}
        creators="Ohana Surf Morocco × Club Fer Landes"
        intro="Seven days. Morocco's best swells. A week built entirely around you — your surfing, your body, your next level. Come ready to work. Leave a better surfer."
        bgImage="/assets/images/SURFLAB-Image-Header.jpg"
        compact
        headerCta={
          <Button variant="primary" size="lg" iconRight="arrow-right" href="/booking?interest=surf-lab" umamiEvent="cta_surf_lab_header">
            Book Now
          </Button>
        }
      />

      <StatStrip />

      <Section id="concept">
        <SectionConcept />
      </Section>

      <PhotoStrip />

      <Section id="included" bg="ink">
        <SectionIncluded />
      </Section>

      <Section id="who" bg="sand">
        <SectionWhoFor />
      </Section>

      <Section id="pricing" bg="teal">
        <SectionPricing />
      </Section>

      <Section id="team">
        <SectionBehind />
      </Section>
    </main>
  )
}
