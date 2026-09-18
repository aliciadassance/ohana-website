'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { Icon, Button, Eyebrow, Section, Field, Input, Textarea, Select, RadioGroup, Checkbox, Skeleton } from '../ui'
import PageHeader from '../PageHeader'
import { PACKAGES, ROOMS } from '@/lib/data'

const DRAFT_KEY = 'ohana_booking_draft'
const REQUIRED_KEYS = ['package', 'arrival', 'departure', 'guests', 'level', 'fullName', 'email', 'phone', 'country'] as const
// guests defaults to '1', so it's excluded from progress — it never needs the visitor to act on it.
const PROGRESS_KEYS = REQUIRED_KEYS.filter((k) => k !== 'guests')

const OHANA_EMAIL = 'ohanasurfguiding@gmail.com'

type FormState = {
  fullName: string
  email: string
  phone: string
  country: string
  package: string
  arrival: string
  departure: string
  guests: string
  level: string
  accommodation: string
  pickup: string
  diet: string
  referral: string
  message: string
  marketing: boolean
  returning: boolean
  /** Honeypot — must remain empty. Real users never see this field. */
  website: string
}

const MAX_LENGTHS = {
  fullName: 200,
  email: 254,
  phone: 40,
  country: 100,
  diet: 500,
  referral: 80,
  message: 5000,
} as const

const PICKUPS = [
  'No pickup needed',
  'Agadir bus pickup (€15 / way)',
  'Agadir airport pickup (€30 / way)',
  'Marrakech airport pickup (€120 / way)',
]

const LEVELS = [
  { value: 'beginner',     label: 'Beginner',     icon: 'swimming' },
  { value: 'intermediate', label: 'Intermediate', icon: 'ripple' },
  { value: 'advanced',     label: 'Advanced',     icon: 'trending-up' },
]

const COUNTRIES = [
  'France','Germany','United Kingdom','Spain','Italy','Netherlands',
  'Belgium','Switzerland','Portugal','Ireland','Sweden','Norway',
  'Denmark','Finland','Austria','Poland','Czech Republic','United States',
  'Canada','Australia','Morocco','Other',
]

// ---- Booking form skeleton (Suspense fallback) ----
function BookingFormSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading booking form">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="form-section">
          <div className="form-section__head">
            <span className="form-section__head__num">{n}</span>
            <Skeleton width="35%" height="1.25rem" radius="6px" />
          </div>

          {n === 1 && (
            <>
              <Skeleton height="2.75rem" radius="999px" />
              <div className="form-grid form-grid--2" style={{ marginTop: '1rem' }}>
                <Skeleton height="2.75rem" />
                <Skeleton height="2.75rem" />
              </div>
              <div className="form-grid form-grid--2" style={{ marginTop: '1rem' }}>
                <Skeleton height="2.75rem" />
                <Skeleton height="2.75rem" />
              </div>
              <div className="form-grid form-grid--2" style={{ marginTop: '1rem' }}>
                <Skeleton height="3.5rem" radius="999px" />
                <Skeleton height="3.5rem" radius="999px" />
                <Skeleton height="3.5rem" radius="999px" />
              </div>
            </>
          )}

          {n === 2 && (
            <>
              <div className="form-grid form-grid--2">
                <Skeleton height="2.75rem" />
                <Skeleton height="2.75rem" />
              </div>
              <div className="form-grid form-grid--2" style={{ marginTop: '1rem' }}>
                <Skeleton height="2.75rem" />
                <Skeleton height="2.75rem" />
              </div>
              <Skeleton height="1.25rem" width="70%" style={{ marginTop: '1rem' }} />
            </>
          )}

          {n === 3 && (
            <>
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                <Skeleton height="3rem" radius="999px" />
                <Skeleton height="3rem" radius="999px" />
                <Skeleton height="3rem" radius="999px" />
                <Skeleton height="3rem" radius="999px" />
              </div>
              <div className="form-grid form-grid--2" style={{ marginTop: '1rem' }}>
                <Skeleton height="2.75rem" />
                <Skeleton height="2.75rem" />
              </div>
            </>
          )}

          {n === 4 && (
            <>
              <Skeleton height="8rem" />
              <Skeleton height="1.25rem" width="80%" style={{ marginTop: '1rem' }} />
            </>
          )}
        </div>
      ))}

      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'stretch' }}>
        <Skeleton height="3.5rem" radius="999px" />
        <Skeleton height="0.85rem" width="65%" style={{ margin: '0 auto' }} />
      </div>
    </div>
  )
}

const SURF_LAB_DATES = { arrival: '2026-12-05', departure: '2026-12-12' }

// ---- Booking form ----
function BookingForm() {
  const searchParams = useSearchParams()
  const interestSurfLab = searchParams.get('interest') === 'surf-lab'
  const initialPackage = searchParams.get('package') ?? (interestSurfLab ? 'Surf Lab' : '')
  const fromEstimate = !!searchParams.get('package') || interestSurfLab

  const [state, setState] = useState<FormState>(() => {
    const base: FormState = {
      fullName: '', email: '', phone: '', country: '',
      package: initialPackage,
      arrival: searchParams.get('arrival') ?? (initialPackage === 'Surf Lab' ? SURF_LAB_DATES.arrival : ''),
      departure: searchParams.get('departure') ?? (initialPackage === 'Surf Lab' ? SURF_LAB_DATES.departure : ''),
      guests: searchParams.get('guests') ?? '1',
      level: '',
      accommodation: searchParams.get('accommodation') ?? '',
      pickup: PICKUPS[0],
      diet: '', referral: '', message: '',
      marketing: false,
      returning: searchParams.get('returning') === 'true',
      website: '',
    }
    // Don't clobber an explicit estimate/deep-link prefill with a stale draft.
    if (fromEstimate) return base
    if (typeof window === 'undefined') return base
    try {
      const saved = window.sessionStorage.getItem(DRAFT_KEY)
      if (!saved) return base
      const parsed = JSON.parse(saved)
      if (parsed && typeof parsed === 'object') return { ...base, ...parsed, website: '' }
    } catch {
      // ignore corrupt/unavailable storage
    }
    return base
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [previewPackage, setPreviewPackage] = useState<string | null>(null)
  const errorBannerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const seenSections = useRef<Set<number>>(new Set())
  const bottomCtaRef = useRef<HTMLDivElement>(null)
  const [bottomCtaVisible, setBottomCtaVisible] = useState(false)

  useEffect(() => {
    if (submitted) return
    try {
      window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ ...state, website: undefined }))
    } catch {
      // storage unavailable (private mode, quota) — draft persistence is a nice-to-have
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, submitted])

  useEffect(() => {
    if (submitError) errorBannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [submitError])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || !bottomCtaRef.current) return
    const observer = new IntersectionObserver(
      (entries) => setBottomCtaVisible(entries[0]?.isIntersecting ?? false),
      // Extend the observed area below the real viewport bottom so the sticky
      // bar hides *before* the real CTAs are physically on-screen, not exactly
      // when they cross the edge — IntersectionObserver callbacks fire a frame
      // or two async, and without this lead time a fast scroll shows both CTAs
      // for a frame right as they cross.
      { threshold: 0, rootMargin: '0px 0px 150px 0px' }
    )
    observer.observe(bottomCtaRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const idx = sectionRefs.current.findIndex((el) => el === entry.target)
          if (idx === -1 || seenSections.current.has(idx)) continue
          seenSections.current.add(idx)
          window.umami?.track('booking_section_reached', { section: idx + 1 })
        }
      },
      { threshold: 0.5 }
    )
    sectionRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    setState((s) => ({ ...s, [key]: val }))
    if (errors[key as string]) setErrors((e) => ({ ...e, [key]: '' }))
  }

  function selectPackage(name: string) {
    setState((s) => ({
      ...s,
      package: name,
      ...(name === 'Surf Lab' ? SURF_LAB_DATES : {}),
    }))
    setErrors((e) => ({ ...e, package: '' }))
    window.umami?.track('booking_package_selected', { package: name })
  }

  const hasControlChars = (s: string) => /[\r\n\0]/.test(s)

  function validateField(key: keyof FormState, s: FormState = state): string {
    switch (key) {
      case 'fullName':
        if (!s.fullName.trim()) return 'Please tell us your name'
        if (s.fullName.length > MAX_LENGTHS.fullName) return 'Name is too long'
        if (hasControlChars(s.fullName)) return 'Name contains forbidden characters'
        return ''
      case 'email':
        if (!s.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email) || hasControlChars(s.email)) {
          return 'We need a valid email'
        }
        return ''
      case 'phone':
        if (!s.phone.trim()) return 'Add your WhatsApp number so we can reach you'
        if (s.phone.length > MAX_LENGTHS.phone) return 'Phone number is too long'
        return ''
      case 'country':
        return s.country ? '' : 'Pick your country'
      case 'package':
        return s.package ? '' : 'Choose a package'
      case 'arrival':
        return s.arrival ? '' : 'Pick an arrival date'
      case 'departure':
        if (!s.departure) return 'Pick a departure date'
        if (s.arrival && s.arrival >= s.departure) return 'Departure must be after arrival'
        return ''
      case 'level':
        return s.level ? '' : 'Pick your surf level'
      case 'message':
        return s.message.length > MAX_LENGTHS.message ? `Message must be ${MAX_LENGTHS.message} characters or fewer` : ''
      default:
        return ''
    }
  }

  function onFieldBlur(key: keyof FormState) {
    const msg = validateField(key)
    setErrors((e) => ({ ...e, [key]: msg }))
  }

  function validate(): boolean {
    const e: Record<string, string> = {}
    for (const key of [...REQUIRED_KEYS, 'message'] as (keyof FormState)[]) {
      const msg = validateField(key)
      if (msg) e[key as string] = msg
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const filledCount = PROGRESS_KEYS.filter((k) => String(state[k] ?? '').trim().length > 0).length
  const progressPct = Math.round((filledCount / PROGRESS_KEYS.length) * 100)

  function scrollToFirstError() {
    requestAnimationFrame(() => {
      const el = document.querySelector('.field--error') as HTMLElement | null
      if (el) {
        window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 120, behavior: 'smooth' })
      }
    })
  }

  function buildWhatsAppMessage(s: FormState): string {
    const levelLabel = LEVELS.find((l) => l.value === s.level)?.label ?? s.level
    const roomLabel = s.accommodation ? ROOMS.find((r) => r.id === s.accommodation)?.name ?? s.accommodation : ''
    const lines = [
      "Hi Ohana! I'd like to request a booking.",
      '',
      `Package: ${s.package}`,
      `Dates: ${s.arrival} → ${s.departure}`,
      `Guests: ${s.guests}`,
      levelLabel ? `Surf level: ${levelLabel}` : '',
      roomLabel ? `Room preference: ${roomLabel}` : '',
      s.returning ? 'Returning guest — 10% discount' : '',
      '',
      `Name: ${s.fullName}`,
      `Email: ${s.email}`,
      `Phone: ${s.phone}`,
      `Country: ${s.country}`,
      s.pickup && s.pickup !== PICKUPS[0] ? `Pickup: ${s.pickup}` : '',
      s.diet ? `Dietary requirements: ${s.diet}` : '',
      s.message ? `Message: ${s.message}` : '',
    ].filter(Boolean)
    return lines.join('\n')
  }

  function handleWhatsAppClick() {
    setSubmitError(null)
    if (!validate()) {
      scrollToFirstError()
      return
    }
    window.umami?.track('booking_whatsapp_click', { package: state.package })
    const text = encodeURIComponent(buildWhatsAppMessage(state))
    window.open(`https://wa.me/212650613372?text=${text}`, '_blank', 'noopener')
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault()
    setSubmitError(null)
    if (!validate()) {
      scrollToFirstError()
      return
    }

    setSubmitting(true)
    try {
      // Try twice: a network blip or a transient 5xx from the mail service
      // shouldn't cost the guest their booking.
      let res: Response | null = null
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          res = await fetch('/api/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state),
          })
        } catch {
          res = null
        }
        if (res && (res.ok || res.status < 500)) break
        if (attempt === 0) await new Promise((r) => setTimeout(r, 1200))
      }

      if (!res) throw new Error('Network error')

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (res.status === 400 && data?.fields) {
          setErrors(data.fields as Record<string, string>)
          scrollToFirstError()
          return
        }
        if (res.status === 429) {
          window.umami?.track('booking_rate_limited')
          setSubmitError("You've submitted a few requests recently — please give us a moment, or reach us directly on WhatsApp.")
          return
        }
        throw new Error('Request failed')
      }
      window.umami?.track('booking_submitted', { package: state.package, guests: Number(state.guests) })
      try { window.sessionStorage.removeItem(DRAFT_KEY) } catch { /* ignore */ }
      setSubmitted(true)
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    } catch {
      window.umami?.track('booking_error')
      setSubmitError('Something went wrong sending your request. Please email us directly at ohanasurfguiding@gmail.com or reach out on WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="booking-success">
        <div className="booking-success__icon"><Icon name="check" /></div>
        <Eyebrow>Request sent</Eyebrow>
        <h2>Salaam {state.fullName.split(' ')[0]} — talk soon!</h2>
        <p>
          We&apos;ve received your booking request and will reply within 24 hours with
          availability, total price, and next steps. In the meantime, you can reach us
          directly on WhatsApp or by email — we usually answer faster there.
        </p>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
          <Button variant="primary" iconLeft="brand-whatsapp" href="https://wa.me/212650613372" umamiEvent="contact_whatsapp">
            Chat on WhatsApp
          </Button>
          <Button variant="outline" iconLeft="mail" href={`mailto:${OHANA_EMAIL}`} umamiEvent="contact_email">
            Email us directly
          </Button>
        </div>
        <div style={{ marginTop: '2rem', padding: '1rem 1.25rem', background: 'var(--brand-sand-100)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', color: 'var(--color-fg-muted)' }}>
          <Icon name="info-circle" /> &nbsp;
          A confirmation has been sent to <strong>{state.email}</strong>.
        </div>
      </div>
    )
  }

  return (
    <form id="booking-form" onSubmit={handleSubmit} noValidate>
      <div className="booking-progress" aria-hidden="true">
        <span>{filledCount}/{PROGRESS_KEYS.length} required fields</span>
        <span className="booking-progress__track">
          <span className="booking-progress__fill" style={{ width: `${progressPct}%` }} />
        </span>
      </div>
      {/* Honeypot — visually hidden, off-screen, autocomplete off. Bots fill this; humans don't. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="website">Website (leave blank)</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          data-lpignore="true"
          data-1p-ignore
          data-form-type="other"
          value={state.website}
          onChange={(e) => set('website', e.target.value)}
        />
      </div>
      {fromEstimate && (
        <p className="prefill-notice">
          <Icon name="sparkles" /> Pre-filled from your estimate — feel free to adjust.
        </p>
      )}
      {/* SECTION 1 — Trip */}
      <div className="form-section" ref={(el) => { sectionRefs.current[0] = el }}>
        <div className="form-section__head">
          <span className="form-section__head__num">1</span>
          <h3>Your trip</h3>
        </div>

        <Field label="Choose your package" required htmlFor="package" error={errors.package}>
          <div className="radio-group radio-group--packages" role="radiogroup">
            {PACKAGES.filter(p => p.id !== 'surf-only').map((p) => (
              <label
                key={p.id}
                className={`radio-tile ${state.package === p.name ? 'is-checked' : ''}`}
                onMouseEnter={() => setPreviewPackage(p.name)}
                onMouseLeave={() => setPreviewPackage(null)}
                onFocus={() => setPreviewPackage(p.name)}
                onBlur={() => setPreviewPackage(null)}
              >
                <input
                  type="radio"
                  name="package"
                  value={p.name}
                  checked={state.package === p.name}
                  onChange={() => selectPackage(p.name)}
                />
                <span>{p.name}</span>
              </label>
            ))}
            <label
              className={`radio-tile radio-tile--surf-lab ${state.package === 'Surf Lab' ? 'is-checked' : ''}`}
              onMouseEnter={() => setPreviewPackage('Surf Lab')}
              onMouseLeave={() => setPreviewPackage(null)}
              onFocus={() => setPreviewPackage('Surf Lab')}
              onBlur={() => setPreviewPackage(null)}
            >
              <input
                type="radio"
                name="package"
                value="Surf Lab"
                checked={state.package === 'Surf Lab'}
                onChange={() => selectPackage('Surf Lab')}
              />
              <span>Surf Lab <span style={{ color: 'var(--brand-orange-300)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginLeft: '0.4rem' }}>New</span></span>
            </label>
            {PACKAGES.filter(p => p.id === 'surf-only').map((p) => (
              <label
                key={p.id}
                className={`radio-tile ${state.package === p.name ? 'is-checked' : ''}`}
                onMouseEnter={() => setPreviewPackage(p.name)}
                onMouseLeave={() => setPreviewPackage(null)}
                onFocus={() => setPreviewPackage(p.name)}
                onBlur={() => setPreviewPackage(null)}
              >
                <input
                  type="radio"
                  name="package"
                  value={p.name}
                  checked={state.package === p.name}
                  onChange={() => selectPackage(p.name)}
                />
                <span>{p.name}</span>
              </label>
            ))}
          </div>
          <p className="package-preview">
            {(previewPackage && PACKAGES.find((p) => p.name === previewPackage)?.sub)
              || (state.package && PACKAGES.find((p) => p.name === state.package)?.sub)
              || ' '}
          </p>
        </Field>

        <div className="form-grid form-grid--2">
          <Field label="Arrival date" required htmlFor="arrival" error={errors.arrival}>
            <Input id="arrival" name="arrival" type="date" value={state.arrival} onChange={(e) => set('arrival', e.target.value)} onBlur={() => onFieldBlur('arrival')} required />
          </Field>
          <Field label="Departure date" required htmlFor="departure" error={errors.departure}>
            <Input id="departure" name="departure" type="date" value={state.departure} onChange={(e) => set('departure', e.target.value)} onBlur={() => onFieldBlur('departure')} required />
          </Field>
        </div>

        <div className="form-grid form-grid--2">
          <Field label="Number of guests" required htmlFor="guests" hint="More than 8? WhatsApp us directly">
            <Input id="guests" name="guests" type="number" inputMode="numeric" min={1} max={8} value={state.guests} onChange={(e) => set('guests', e.target.value)} required />
          </Field>
          <Field label="Room preference" htmlFor="accommodation" hint="Optional — subject to availability">
            <Select
              id="accommodation"
              name="accommodation"
              placeholder="No preference"
              options={ROOMS.map((r) => ({ value: r.id, label: r.name }))}
              value={state.accommodation}
              onChange={(e) => set('accommodation', e.target.value)}
            />
          </Field>
        </div>

        <Field label="Your surf level" required error={errors.level}>
          <RadioGroup name="level" options={LEVELS} value={state.level} onChange={(v) => set('level', v)} />
        </Field>
      </div>

      {/* SECTION 2 — Contact */}
      <div className="form-section" ref={(el) => { sectionRefs.current[1] = el }}>
        <div className="form-section__head">
          <span className="form-section__head__num">2</span>
          <h3>Your details</h3>
        </div>

        <div className="form-grid form-grid--2">
          <Field label="Full name" required htmlFor="fullName" error={errors.fullName}>
            <Input id="fullName" name="fullName" autoComplete="name" value={state.fullName} onChange={(e) => set('fullName', e.target.value)} onBlur={() => onFieldBlur('fullName')} placeholder="Yassin Bouchareb" required />
          </Field>
          <Field label="Email" required htmlFor="email" error={errors.email}>
            <Input id="email" name="email" type="email" autoComplete="email" inputMode="email" value={state.email} onChange={(e) => set('email', e.target.value)} onBlur={() => onFieldBlur('email')} placeholder="you@email.com" required />
          </Field>
        </div>

        <div className="form-grid form-grid--2">
          <Field label="Phone / WhatsApp" required htmlFor="phone" error={errors.phone}>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={state.phone} onChange={(e) => set('phone', e.target.value)} onBlur={() => onFieldBlur('phone')} placeholder="+33 6 12 34 56 78" required />
          </Field>
          <Field label="Country" required htmlFor="country" error={errors.country}>
            <Select
              id="country"
              name="country"
              autoComplete="country-name"
              placeholder="Select your country"
              options={COUNTRIES.map((c) => ({ value: c, label: c }))}
              value={state.country}
              onChange={(e) => set('country', e.target.value)}
              required
            />
          </Field>
        </div>

        <Checkbox
          name="returning"
          value="yes"
          checked={state.returning}
          onChange={(v) => set('returning', v)}
          label="I'm a returning guest — apply 10% discount on my package"
        />
      </div>

      {/* SECTION 3 — Pickup & extras */}
      <div className="form-section form-section--optional" ref={(el) => { sectionRefs.current[2] = el }}>
        <div className="form-section__head">
          <span className="form-section__head__num">3</span>
          <h3>Transports &amp; Additional infos <span style={{ fontSize: '0.85rem', color: 'var(--color-fg-muted)', fontFamily: 'var(--font-body)', marginLeft: '0.4rem' }}>(optional)</span></h3>
        </div>

        <Field label="How will you get to the camp?" hint="Pick the option that fits your arrival — we'll arrange the rest">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
            {PICKUPS.map((p) => (
              <label key={p} className={`radio-tile radio-tile--row ${state.pickup === p ? 'is-checked' : ''}`}>
                <input type="radio" name="pickup" value={p} checked={state.pickup === p} onChange={() => set('pickup', p)} />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </Field>

        <div className="form-grid form-grid--2">
          <Field label="Dietary requirements" htmlFor="diet">
            <Input id="diet" name="diet" value={state.diet} onChange={(e) => set('diet', e.target.value)} placeholder="Vegetarian, gluten-free, allergies…" />
          </Field>
          <Field label="How did you hear about us?" htmlFor="referral">
            <Select
              id="referral"
              name="referral"
              placeholder="Choose one"
              options={[
                { value: 'Instagram', label: 'Instagram' },
                { value: 'Facebook', label: 'Facebook' },
                { value: 'Google', label: 'Google search' },
                { value: 'Friend', label: 'From a friend' },
                { value: 'Returning', label: "I've been before" },
                { value: 'Other', label: 'Other' },
              ]}
              value={state.referral}
              onChange={(e) => set('referral', e.target.value)}
            />
          </Field>
        </div>
      </div>

      {/* SECTION 4 — Free text */}
      <div className="form-section form-section--optional" ref={(el) => { sectionRefs.current[3] = el }}>
        <div className="form-section__head">
          <span className="form-section__head__num">4</span>
          <h3>Anything else? <span style={{ fontSize: '0.85rem', color: 'var(--color-fg-muted)', fontFamily: 'var(--font-body)', marginLeft: '0.4rem' }}>(optional)</span></h3>
        </div>

        <Field label="Tell us anything we should know" htmlFor="message" hint="Special requests, surf goals, who you're travelling with, questions for us — anything at all.">
          <Textarea
            id="message"
            name="message"
            rows={6}
            value={state.message}
            onChange={(e) => set('message', e.target.value.slice(0, MAX_LENGTHS.message))}
            placeholder="e.g. I'm coming with my partner who's never surfed. We'd love a quiet room and recommendations for a day trip to Paradise Valley…"
          />
        </Field>

        <Checkbox
          name="marketing"
          value="yes"
          checked={state.marketing}
          onChange={(v) => set('marketing', v)}
          label="Keep me posted on swell forecasts and Ohana news — no spam, you can unsubscribe anytime."
        />
      </div>

      {submitError && (
        <div ref={errorBannerRef} tabIndex={-1} style={{ padding: '1rem', background: '#fde7e3', color: '#9b1c0d', borderRadius: 'var(--radius-md)', marginTop: '1.25rem' }}>
          {submitError}
        </div>
      )}

      <div ref={bottomCtaRef} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Button type="submit" variant="primary" size="lg" iconRight="arrow-right" disabled={submitting} fullWidth>
          {submitting ? 'Sending your request…' : 'Send request by email'}
        </Button>
        <Button type="button" variant="whatsapp" size="lg" iconLeft="brand-whatsapp" onClick={handleWhatsAppClick} fullWidth>
          Send via WhatsApp instead
        </Button>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--color-fg-muted)', textAlign: 'center', marginTop: '1rem' }}>
        By submitting, you agree to be contacted by Ohana Surf Morocco. We never share your details.
        We reply within 24h.
      </p>

      <div className={`booking-sticky-cta ${bottomCtaVisible ? 'is-hidden' : ''}`}>
        <Button type="submit" form="booking-form" variant="primary" size="lg" disabled={submitting} className="booking-sticky-cta__primary">
          {submitting ? 'Sending…' : `Send by email (${progressPct}%)`}
        </Button>
        <Button type="button" variant="whatsapp" size="lg" iconLeft="brand-whatsapp" onClick={handleWhatsAppClick} ariaLabel="Send via WhatsApp instead" className="booking-sticky-cta__whatsapp">
          WhatsApp
        </Button>
      </div>
    </form>
  )
}

// ---- Booking aside ----
function BookingAside() {
  return (
    <aside className="booking-aside">
      <div>
        <Eyebrow>Need help?</Eyebrow>
        <h3 style={{ marginTop: '0.4rem' }}>Talk to us directly</h3>
        <p style={{ color: 'var(--color-fg-muted)', fontSize: '0.95rem', marginTop: '0.4rem' }}>
          Not ready to fill out a form? Reach Yassin and the team any way you like —
          we usually answer within a couple of hours.
        </p>
      </div>

      <div className="aside-list">
        <div className="aside-row">
          <Icon name="brand-whatsapp" />
          <div>
            <strong>WhatsApp</strong>
            <a href="https://wa.me/212650613372" data-umami-event="contact_whatsapp">+212 650-613372</a>
          </div>
        </div>
        <div className="aside-row">
          <Icon name="mail" />
          <div>
            <strong>Email</strong>
            <a href={`mailto:${OHANA_EMAIL}`} data-umami-event="contact_email">{OHANA_EMAIL}</a>
          </div>
        </div>
        <div className="aside-row">
          <Icon name="brand-instagram" />
          <div>
            <strong>Instagram DM</strong>
            <a href="https://www.instagram.com/ohana_surfmorocco/" data-umami-event="social_instagram">@ohana_surfmorocco</a>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div className="aside-row">
          <Icon name="clock" />
          <div><strong>Reply time</strong><span>We answer within 24h, usually much faster</span></div>
        </div>
        <div className="aside-row">
          <Icon name="shield-check" />
          <div><strong>No deposit needed</strong><span>We confirm availability and quote before any payment</span></div>
        </div>
        <div className="aside-row">
          <Icon name="heart" />
          <div><strong>Returning guest?</strong><span>10% off your next stay — tick the box in the form</span></div>
        </div>
      </div>
    </aside>
  )
}

// ---- Booking page ----
export default function BookingPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Booking request"
        title={<>Tell us about your <em style={{ color: 'var(--brand-orange-300)' }}>trip</em></>}
        intro="Fill in the form below. We'll come back within 24 hours with availability, a full quote, and answers to anything you'd like to ask. No deposit required to request a booking."
        bgImage="/assets/images/booking-hero.jpg"
      />
      <Section id="book">
        <div className="booking-layout">
          <div>
            <Suspense fallback={<BookingFormSkeleton />}>
              <BookingForm />
            </Suspense>
          </div>
          <BookingAside />
        </div>
      </Section>
    </main>
  )
}
