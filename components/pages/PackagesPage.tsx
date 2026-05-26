'use client'

import { useState, useMemo } from 'react'
import type { CSSProperties } from 'react'
import { useRouter } from 'next/navigation'
import { Icon, Button, Eyebrow, Section, Badge, SkeletonImg } from '../ui'
import PageHeader from '../PageHeader'
import CTABanner from '../CTABanner'
import { PackagesCarousel, PackageCard } from './HomePage'
import { PACKAGES, ROOMS, FAQS, MEAL_PRICE_PER_MEAL, ACTIVITY_PRICES, PACKAGE_ACTIVITIES, RETURNING_GUEST_DISCOUNT, ACTIVITY_BLACKOUTS, ADDON_PRICES } from '@/lib/data'
import type { Package } from '@/lib/types'

// ---- Comparison table ----
function ComparisonTable() {
  const rows: { label: string; values: (string | boolean)[] }[] = [
    { label: 'Accommodation',          values: [true,        true,           true,           false] },
    { label: 'All meals included',     values: [true,        true,           true,           false] },
    { label: 'Surf sessions / day',    values: ['2',         '2',            '2',            '1 or 2'] },
    { label: 'Equipment included',     values: [true,        true,           true,           true] },
    { label: 'Photo & video analysis', values: [true,        true,           true,           'Optional'] },
    { label: 'Surfskate session',      values: ['Weekly',    'Weekly',       'Weekly',       false] },
    { label: 'Yoga sessions',          values: [false,       'Daily',        false,          false] },
    { label: 'Pilates sessions',       values: [false,       false,          '4 per week',        false] },
    { label: 'Local souk excursion',   values: [true,        true,           true,           false] },
  ]

  const cellStyle: CSSProperties = { padding: '0.85rem 0.9rem', borderBottom: '1px solid var(--color-border)', fontSize: '0.92rem' }
  const head: CSSProperties = { ...cellStyle, fontFamily: 'var(--font-display)', fontSize: '1.25rem', background: 'var(--brand-sand-100)', textAlign: 'center', padding: '1.1rem 0.9rem' }

  function Cell({ v }: { v: string | boolean }) {
    if (v === true) return <Icon name="check" style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }} />
    if (v === false) return <Icon name="minus" style={{ color: 'var(--color-fg-muted)', fontSize: '1rem', opacity: 0.4 }} />
    return <span>{v}</span>
  }

  return (
    <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', background: 'white' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
        <thead>
          <tr>
            <th style={head}> </th>
            {PACKAGES.map((p) => <th key={p.id} style={head}>{p.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th style={{ ...cellStyle, fontWeight: 600, textAlign: 'left', width: '24%' }}>{row.label}</th>
              {row.values.map((v, i) => (
                <td key={i} style={{ ...cellStyle, textAlign: 'center' }}><Cell v={v} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---- Surf only card with toggles ----
export function SurfOnlyCard({ pkg, onClick }: { pkg: Package; onClick: () => void }) {
  const [fullDay, setFullDay] = useState(false)
  const [sessionType, setSessionType] = useState<'group' | 'private'>('group')
  const isPrivate = sessionType === 'private'
  const price = isPrivate ? 50 : (fullDay ? pkg.priceFullDay ?? pkg.priceFrom : pkg.priceFrom)
  const unit = isPrivate ? '/ person' : (fullDay ? '/ person · full day' : '/ person · half day')

  return (
    <article className="card card--hover pkg">
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

        <label className="toggle-row">
          <span className="toggle-row__label">
            <Icon name="sun" />
            <span>Full day session</span>
          </span>
          <span
            className={`toggle ${fullDay ? 'is-on' : ''}`}
            onClick={() => setFullDay(!fullDay)}
            role="switch"
            aria-checked={fullDay}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setFullDay(!fullDay)}
          >
            <span className="toggle__dot" />
          </span>
        </label>

        <div className="seg" role="tablist" aria-label="Session type" style={{ marginTop: '-0.25rem' }}>
          <button type="button" role="tab" aria-selected={sessionType === 'group'} className={`seg__btn ${sessionType === 'group' ? 'is-active' : ''}`} onClick={() => setSessionType('group')}>
            <Icon name="users" /> &nbsp;Group
          </button>
          <button type="button" role="tab" aria-selected={sessionType === 'private'} className={`seg__btn ${sessionType === 'private' ? 'is-active' : ''}`} onClick={() => setSessionType('private')}>
            <Icon name="user" /> &nbsp;Private
          </button>
        </div>

        <div className="pkg__price">
          <span className="pkg__price__from">From</span>
          <span className="pkg__price__num">€{price}</span>
          <span className="pkg__price__unit">{unit}</span>
        </div>
        <Button variant="ink" fullWidth iconRight="arrow-right" onClick={onClick} className="pkg__cta">
          Book this package
        </Button>
      </div>
    </article>
  )
}

// ---- Price simulator ----
// Stay packages only — Surf Only has its own dedicated card with per-session toggles
const STAY_PACKAGES = PACKAGES.filter(p => p.id in PACKAGE_ACTIVITIES)

function PriceSimulator() {
  const router = useRouter()
  const [packageId, setPackageId] = useState(STAY_PACKAGES[0].id)
  const [arrival, setArrival] = useState('')
  const [departure, setDeparture] = useState('')
  const [roomId, setRoomId] = useState(ROOMS[0].id)
  const [people, setPeople] = useState(2)
  const [returningGuest, setReturningGuest] = useState(false)

  const nights = useMemo(() => {
    if (!arrival || !departure) return 0
    const a = new Date(arrival).getTime()
    const d = new Date(departure).getTime()
    if (isNaN(a) || isNaN(d) || d <= a) return 0
    return Math.round((d - a) / 86400000)
  }, [arrival, departure])

  const selectedRoom = ROOMS.find(r => r.id === roomId) ?? ROOMS[0]
  const selectedPkg = STAY_PACKAGES.find(p => p.id === packageId) ?? STAY_PACKAGES[0]

  const total = useMemo(() => {
    if (!nights) return 0
    const roomCost = selectedRoom.pricingType === 'flat'
      ? selectedRoom.nightlyRate * nights
      : selectedRoom.nightlyRate * people * nights
    const mealCost = MEAL_PRICE_PER_MEAL * 3 * nights * people
    const sessions = PACKAGE_ACTIVITIES[packageId] ?? {}
    const activityCost = Math.round(
      Object.entries(sessions).reduce((sum, [act, count]) =>
        sum + (ACTIVITY_PRICES[act as keyof typeof ACTIVITY_PRICES] ?? 0) * (count ?? 0), 0
      ) * (nights / 7) * people
    )
    const subtotal = roomCost + mealCost + activityCost
    const discount = returningGuest ? Math.round(subtotal * RETURNING_GUEST_DISCOUNT) : 0
    return subtotal - discount
  }, [nights, selectedRoom, people, packageId, returningGuest])

  const capacityWarning = people > selectedRoom.maxPax

  const blackoutWarnings = useMemo(() => {
    if (!arrival || !departure) return []
    const pkgSessions = PACKAGE_ACTIVITIES[packageId] ?? {}
    const arrDate = new Date(arrival)
    const depDate = new Date(departure)
    return ACTIVITY_BLACKOUTS.filter(b =>
      b.activity in pkgSessions &&
      arrDate < new Date(b.to) && depDate > new Date(b.from)
    )
  }, [arrival, departure, packageId])

  return (
    <div className="simulator">
      <div className="simulator__head">
        <Eyebrow>Price simulator</Eyebrow>
        <h2>Get an instant estimate</h2>
        <p>Pick your package, dates and room — we&apos;ll give you a ballpark total. Final quote arrives within 24h.</p>
      </div>

      <div className="simulator__form">
        <div className="simulator__field">
          <label>Package</label>
          <select value={packageId} onChange={e => setPackageId(e.target.value)} className="select">
            {STAY_PACKAGES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="simulator__field">
          <label>Arrival</label>
          <input type="date" className="input" value={arrival} onChange={e => setArrival(e.target.value)} />
        </div>
        <div className="simulator__field">
          <label>Departure</label>
          <input type="date" className="input" value={departure} onChange={e => setDeparture(e.target.value)} />
        </div>
        <div className="simulator__field">
          <label>Room</label>
          <select value={roomId} onChange={e => setRoomId(e.target.value)} className="select">
            {ROOMS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </div>
        <div className="simulator__field">
          <label>Guests</label>
          <div className="stepper">
            <button type="button" onClick={() => setPeople(Math.max(1, people - 1))} aria-label="Fewer guests"><Icon name="minus" /></button>
            <span>{people}</span>
            <button type="button" onClick={() => setPeople(Math.min(8, people + 1))} aria-label="More guests"><Icon name="plus" /></button>
          </div>
        </div>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.92rem' }}>
        <input
          type="checkbox"
          checked={returningGuest}
          onChange={() => setReturningGuest(v => !v)}
          style={{ width: '1rem', height: '1rem', cursor: 'pointer' }}
        />
        <span>Returning guest — {Math.round(RETURNING_GUEST_DISCOUNT * 100)}% off</span>
      </label>

      {capacityWarning && (
        <div style={{ padding: '0.7rem 1rem', background: 'var(--brand-sand-100)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.88rem', color: 'var(--color-fg)' }}>
          <strong>{selectedRoom.name}</strong> fits up to {selectedRoom.maxPax} guest{selectedRoom.maxPax !== 1 ? 's' : ''}. You may need to book multiple rooms — we&apos;ll sort it out together.
        </div>
      )}
      {blackoutWarnings.map((b, i) => (
        <div key={i} style={{ padding: '0.7rem 1rem', background: 'var(--brand-sand-100)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.88rem', color: 'var(--color-fg)' }}>
          <strong>Heads up:</strong> {b.activity.charAt(0).toUpperCase() + b.activity.slice(1)} sessions may not be available during this period{b.note ? ` (${b.note})` : ''} — we&apos;ll confirm after you book.
        </div>
      ))}

      <div className="simulator__total">
        <div>
          <div className="simulator__total__label">Estimated total</div>
          <div className="simulator__total__num">€{total ? total.toLocaleString() : '—'}</div>
          <div className="simulator__total__hint">
            {nights
              ? `${people} guest${people !== 1 ? 's' : ''} · ${nights} night${nights !== 1 ? 's' : ''} · ${selectedPkg.name}`
              : 'Pick your dates to see an estimate'
            }
          </div>
        </div>
        <Button variant="primary" size="lg" iconRight="arrow-right" onClick={() => {
          const params = new URLSearchParams({
            package: selectedPkg.name,
            arrival,
            departure,
            guests: String(people),
            accommodation: roomId,
            returning: String(returningGuest),
          })
          router.push(`/booking?${params}`)
        }}>
          Request booking
        </Button>
      </div>
    </div>
  )
}

// ---- Rooms ----
function RoomsSection() {
  return (
    <Section id="rooms">
      <div className="section-head">
        <Eyebrow>Where you&apos;ll sleep</Eyebrow>
        <h2>Rooms at the house</h2>
        <p>Six rooms, one house.
        From a shared room where friendships start on day one, to a private double with a balcony and a view worth waking up for — pick the one that fits your trip.</p>
      </div>
      <div className="rooms-grid">
        {ROOMS.map((r) => (
          <article key={r.id} className="room-card card">
            <div className="room-card__media">
              <SkeletonImg src={r.image} alt={r.name} loading="lazy" />
            </div>
            <div className="room-card__body">
              <span className="room-card__capacity"><Icon name="users" /> {r.capacity}</span>
              <h3>{r.name}</h3>
              <p>{r.sub}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

// ---- FAQ ----
function FAQSection() {
  return (
    <Section id="faq" bg="sand">
      <div className="section-head">
        <Eyebrow>Good to know</Eyebrow>
        <h2>Frequently asked questions</h2>
        <p>Most common questions before booking. If you don&apos;t see yours, just drop us a line — we usually answer within a couple of hours.</p>
      </div>
      <div className="faq" style={{ maxWidth: '900px' }}>
        {FAQS.map((faq, i) => (
          <details key={i} className="faq__item">
            <summary>
              {faq.q}
              <Icon name="plus" />
            </summary>
            <div className="faq__body">{faq.a}</div>
          </details>
        ))}
      </div>
    </Section>
  )
}

// ---- Add-ons ----
function AddOns() {
  const [pickup, setPickup] = useState<'bus' | 'airport'>('bus')
  const [yogaType, setYogaType] = useState<'private' | 'group'>('group')
  const [trip, setTrip] = useState<'imsouane' | 'tifnit'>('imsouane')

  const pickupPrice = pickup === 'bus' ? `€${ADDON_PRICES.pickup_bus} / way` : `€${ADDON_PRICES.pickup_airport} / way`
  const yogaPrice = yogaType === 'private' ? `€${ADDON_PRICES.yoga_private} / session` : `€${ADDON_PRICES.yoga_group} / person`
  const yogaSub = yogaType === 'private'
    ? 'One-on-one yoga or pilates session'
    : 'Join a sunrise or sunset class on the rooftop'
  const tripSub = trip === 'imsouane'
    ? 'Chase the longest right in Morocco — full-day road trip north'
    : 'Wide-open beach breaks south of Agadir — uncrowded all day'

  const items = [
    { icon: 'shopping-bag', title: 'Agadir Souk',          sub: 'Half-day trip to the spice souk',       price: `€${ADDON_PRICES.souk} / taxi` },
    { icon: 'tree',         title: 'Paradise Valley',       sub: 'Day trip — palms, pools, picnic',       price: `€${ADDON_PRICES.paradise_valley} / person` },
    { icon: 'mountain',     title: 'Sand Dunes Excursion',  sub: 'Sunset over the dunes south of Agadir', price: `€${ADDON_PRICES.sand_dunes} / person` },
    { icon: 'bath',         title: 'Hammam & massage',      sub: '90 min traditional treatment',          price: `€${ADDON_PRICES.hammam} / session` },
    { icon: 'users-group',  title: 'Group booking',         sub: 'Bring 4+ friends, get 5% off',          price: 'Save €110+' },
  ]

  return (
    <Section id="addons">
      <div className="section-head">
        <Eyebrow>Add to your stay</Eyebrow>
        <h2>Make it exactly yours</h2>
        <p>Optional extras to upgrade your stay. Pick what you want upon booking or during your stay.</p>
      </div>
      <div className="feature-grid">
        <div className="feature feature--toggle">
          <span className="feature__icon"><Icon name="bus" /></span>
          <h3>Agadir Pick-up</h3>
          <p>Get to the camp without the hassle — pick how you want to get here.</p>
          <div className="seg" role="tablist" aria-label="Pickup type">
            <button type="button" role="tab" aria-selected={pickup === 'bus'} className={`seg__btn ${pickup === 'bus' ? 'is-active' : ''}`} onClick={() => setPickup('bus')}>Bus</button>
            <button type="button" role="tab" aria-selected={pickup === 'airport'} className={`seg__btn ${pickup === 'airport' ? 'is-active' : ''}`} onClick={() => setPickup('airport')}>Airport</button>
          </div>
          <div className="feature__price">{pickupPrice}</div>
        </div>

        <div className="feature feature--toggle">
          <span className="feature__icon"><Icon name="yoga" /></span>
          <h3>Yoga &amp; Pilates</h3>
          <p>{yogaSub}</p>
          <div className="seg" role="tablist" aria-label="Class type">
            <button type="button" role="tab" aria-selected={yogaType === 'group'} className={`seg__btn ${yogaType === 'group' ? 'is-active' : ''}`} onClick={() => setYogaType('group')}>Group</button>
            <button type="button" role="tab" aria-selected={yogaType === 'private'} className={`seg__btn ${yogaType === 'private' ? 'is-active' : ''}`} onClick={() => setYogaType('private')}>Private</button>
          </div>
          <div className="feature__price">{yogaPrice}</div>
        </div>

        <div className="feature feature--toggle">
          <span className="feature__icon"><Icon name="route" /></span>
          <h3>Surf Trip</h3>
          <p>{tripSub}</p>
          <div className="seg" role="tablist" aria-label="Surf trip destination">
            <button type="button" role="tab" aria-selected={trip === 'imsouane'} className={`seg__btn ${trip === 'imsouane' ? 'is-active' : ''}`} onClick={() => setTrip('imsouane')}>Imsouane</button>
            <button type="button" role="tab" aria-selected={trip === 'tifnit'} className={`seg__btn ${trip === 'tifnit' ? 'is-active' : ''}`} onClick={() => setTrip('tifnit')}>Tifnit</button>
          </div>
          <div className="feature__price">€{ADDON_PRICES.surf_trip} / person</div>
        </div>

        {items.map((it) => (
          <div key={it.title} className="feature">
            <span className="feature__icon"><Icon name={it.icon} /></span>
            <h3>{it.title}</h3>
            <p>{it.sub}</p>
            <div className="feature__price">{it.price}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ---- Packages page ----
export default function PackagesPage() {
  const router = useRouter()
  return (
    <main>
      <PageHeader
        eyebrow="Surf packages"
        title={<>Four ways to <em style={{ color: 'var(--brand-orange-300)' }}>ride with us</em></>}
        intro="Whether you're chasing your first wave or your hundredth swell, there's a package built for your trip. And if none of them fit perfectly, just ask — we'll make it work."
        bgImage="/assets/images/packages-hero.jpg"
        titleNoWrap
      />

      <div className="container" style={{ marginTop: '2rem' }}>
        <div style={{ background: 'var(--brand-teal-50)', borderRadius: 'var(--radius-md)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.95rem', color: 'var(--brand-teal-700)', border: '1px solid var(--brand-teal-100)' }}>
          <Icon name="heart" style={{ color: 'var(--color-accent)', fontSize: '1.2rem' }} />
          <span><strong>Returning guest?</strong> Enjoy 10% off any package. Just mention your last visit in the booking form.</span>
        </div>
      </div>

      <Section tight>
        <PackagesCarousel useSurfOnlyCard SurfOnlyCard={SurfOnlyCard} />
      </Section>

      <Section bg="sand">
        <PriceSimulator />
      </Section>

      <RoomsSection />

      <Section>
        <div className="section-head">
          <Eyebrow>Compare</Eyebrow>
          <h2>What&apos;s included in each package</h2>
          <p>Side-by-side breakdown to help you choose.</p>
        </div>
        <ComparisonTable />
      </Section>

      <AddOns />
      <FAQSection />

      <Section>
        <CTABanner
          title="Not sure which package fits?"
          description="Tell us a bit about your trip and we'll recommend the right setup. No commitment — just a friendly conversation."
          ctaLabel="Get a recommendation"
          onCTA={() => router.push('/booking')}
        />
      </Section>
    </main>
  )
}
