import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { BookingSchema, type BookingInput } from './schema'
import { logger } from '@/lib/log'

const log = logger('api/booking')

const OHANA_EMAIL = process.env.RESEND_TO_EMAIL || 'ohanasurfguiding@gmail.com'

const escapeHtml = (s: unknown): string =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;')

const sanitizeForHeader = (s: string): string => s.replace(/[\r\n\0]+/g, ' ').trim().slice(0, 200)

function getIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

function originAllowed(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  if (!origin) return false
  const host = request.headers.get('host')
  if (host && origin.endsWith(`://${host}`)) return true
  const allowed = process.env.ALLOWED_ORIGIN
  return !!allowed && origin === allowed
}

function buildNotificationHtml(s: BookingInput): string {
  const row = (label: string, value: string | number | boolean | undefined) =>
    value
      ? `<tr><td style="padding:8px 12px;font-family:sans-serif;font-size:14px;color:#555;border-bottom:1px solid #f0ede6;width:35%;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:8px 12px;font-family:sans-serif;font-size:14px;color:#1a1a1a;border-bottom:1px solid #f0ede6;font-weight:500">${escapeHtml(value)}</td></tr>`
      : ''

  const messageHtml = s.message
    ? `
        <!-- Message -->
        <tr><td style="padding:20px 32px 4px"><p style="font-family:sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#e48424;margin:0;font-weight:600">Their message</p></td></tr>
        <tr><td style="padding:0 20px 8px">
          <div style="background:#f7f3ec;border-radius:8px;padding:16px 20px;font-family:sans-serif;font-size:14px;color:#1a1a1a;line-height:1.6;white-space:pre-wrap">${escapeHtml(s.message)}</div>
        </td></tr>
        `
    : ''

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f7f3ec">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f3ec;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
        <tr>
          <td style="background:#143b45;padding:28px 32px">
            <p style="margin:0;font-family:sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.6)">New booking request</p>
            <h1 style="margin:8px 0 0;font-family:Georgia,serif;font-size:28px;color:white;font-weight:400">Ohana Surf Morocco</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 8px">
            <p style="font-family:sans-serif;font-size:16px;color:#1a1a1a;margin:0 0 4px"><strong>${escapeHtml(s.fullName)}</strong> wants to book a stay!</p>
            <p style="font-family:sans-serif;font-size:14px;color:#6b6760;margin:0">Submitted via the website booking form. Reply directly to this email to reach the guest.</p>
          </td>
        </tr>
        <tr><td style="padding:20px 32px 4px"><p style="font-family:sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#e48424;margin:0;font-weight:600">The trip</p></td></tr>
        <tr><td style="padding:0 20px">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0ede6;border-radius:8px;overflow:hidden">
            ${row('Package', s.package)}
            ${row('Arrival', s.arrival)}
            ${row('Departure', s.departure)}
            ${row('Guests', s.guests)}
            ${row('Surf level', s.level)}
            ${row('Room preference', s.accommodation)}
            ${row('Returning guest', s.returning ? 'Yes — apply 10% discount' : '')}
          </table>
        </td></tr>
        <tr><td style="padding:20px 32px 4px"><p style="font-family:sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#e48424;margin:0;font-weight:600">Contact</p></td></tr>
        <tr><td style="padding:0 20px">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0ede6;border-radius:8px;overflow:hidden">
            ${row('Name', s.fullName)}
            ${row('Email', s.email)}
            ${row('Phone / WhatsApp', s.phone)}
            ${row('Country', s.country)}
          </table>
        </td></tr>
        <tr><td style="padding:20px 32px 4px"><p style="font-family:sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#e48424;margin:0;font-weight:600">Extras & logistics</p></td></tr>
        <tr><td style="padding:0 20px">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0ede6;border-radius:8px;overflow:hidden">
            ${row('Pickup', s.pickup)}
            ${row('Dietary requirements', s.diet)}
            ${row('How they heard about us', s.referral)}
            ${row('Newsletter opt-in', s.marketing ? 'Yes' : '')}
          </table>
        </td></tr>
        ${messageHtml}
        <tr>
          <td style="padding:24px 32px;border-top:1px solid #f0ede6;text-align:center">
            <p style="font-family:sans-serif;font-size:12px;color:#999;margin:0">
              Reply to this email to respond directly to ${escapeHtml(s.fullName)} at ${escapeHtml(s.email)}
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function buildConfirmationHtml(s: BookingInput): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f7f3ec">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f3ec;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
        <tr>
          <td style="background:#143b45;padding:28px 32px;text-align:center">
            <p style="margin:0;font-family:sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.6)">Booking request received</p>
            <h1 style="margin:8px 0 0;font-family:Georgia,serif;font-size:28px;color:white;font-weight:400">Ohana Surf Morocco</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 32px 24px;text-align:center">
            <p style="font-family:Georgia,serif;font-size:22px;color:#143b45;margin:0 0 16px">Salaam ${escapeHtml(s.fullName)}! 🤙</p>
            <p style="font-family:sans-serif;font-size:15px;color:#6b6760;line-height:1.6;margin:0 0 12px">
              We've received your booking request and will reply within <strong style="color:#1a1a1a">24 hours</strong> with availability, your full quote, and next steps.
            </p>
            <p style="font-family:sans-serif;font-size:15px;color:#6b6760;line-height:1.6;margin:0">
              In the meantime, feel free to reach us directly on WhatsApp — we usually answer faster there.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 28px">
            <div style="background:#f7f3ec;border-radius:10px;padding:20px 24px">
              <p style="font-family:sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#e48424;margin:0 0 12px;font-weight:600">Your request summary</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="font-family:sans-serif;font-size:14px;color:#6b6760;padding:3px 0">Package</td><td style="font-family:sans-serif;font-size:14px;color:#1a1a1a;font-weight:600;text-align:right">${escapeHtml(s.package)}</td></tr>
                <tr><td style="font-family:sans-serif;font-size:14px;color:#6b6760;padding:3px 0">Dates</td><td style="font-family:sans-serif;font-size:14px;color:#1a1a1a;font-weight:600;text-align:right">${escapeHtml(s.arrival)} → ${escapeHtml(s.departure)}</td></tr>
                <tr><td style="font-family:sans-serif;font-size:14px;color:#6b6760;padding:3px 0">Guests</td><td style="font-family:sans-serif;font-size:14px;color:#1a1a1a;font-weight:600;text-align:right">${escapeHtml(s.guests)}</td></tr>
                ${s.returning ? '<tr><td style="font-family:sans-serif;font-size:14px;color:#e48424;padding:3px 0;font-weight:500" colspan="2">✓ Returning guest discount (10%) applied</td></tr>' : ''}
              </table>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 32px;text-align:center">
            <a href="https://wa.me/212650613372" style="display:inline-block;background:#e48424;color:white;font-family:sans-serif;font-size:14px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;padding:14px 28px;border-radius:999px;text-decoration:none">
              Chat on WhatsApp
            </a>
            <p style="font-family:sans-serif;font-size:12px;color:#aaa;margin:16px 0 0">or reply to this email anytime</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #f0ede6;text-align:center">
            <p style="font-family:sans-serif;font-size:12px;color:#aaa;margin:0">
              Ohana Surf Morocco · Aourir, Agadir · <a href="mailto:${escapeHtml(OHANA_EMAIL)}" style="color:#aaa">${escapeHtml(OHANA_EMAIL)}</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  const ip = getIp(request)

  if (!originAllowed(request)) {
    log.warn('rejected_origin', { origin: request.headers.get('origin') ?? '' })
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  const resendKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Ohana Surf Morocco <booking@ohana-surf-morocco.com>'
  const fromConfirm = process.env.RESEND_FROM_CONFIRM || 'Ohana Surf Morocco <hello@ohana-surf-morocco.com>'

  if (!resendKey) {
    log.error('missing_resend_key')
    return NextResponse.json({ error: 'email_service_unavailable' }, { status: 500 })
  }

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
  }

  const parsed = BookingSchema.safeParse(raw)
  if (!parsed.success) {
    // Honeypot rejection: return generic 400 without signalling the trap
    const issues = parsed.error.issues
    const honeypotHit = issues.some((i) => i.path[0] === 'website')
    if (honeypotHit) {
      log.warn('honeypot_hit', { ip })
      return NextResponse.json({ error: 'invalid_input' }, { status: 400 })
    }
    const fields: Record<string, string> = {}
    for (const issue of issues) {
      const key = String(issue.path[0] ?? '_')
      if (!fields[key]) fields[key] = issue.message
    }
    log.info('validation_failed', { ip, fieldCount: Object.keys(fields).length })
    return NextResponse.json({ error: 'invalid_input', fields }, { status: 400 })
  }

  const data = parsed.data
  const resend = new Resend(resendKey)

  const safeName = sanitizeForHeader(data.fullName)
  const firstName = safeName.split(' ')[0] || 'there'

  const notif = await resend.emails.send({
    from: fromEmail,
    to: OHANA_EMAIL,
    reply_to: data.email,
    subject: `New booking inquiry from ${safeName}`,
    html: buildNotificationHtml(data),
  })
  if (notif.error) {
    log.error('notification_failed', { ip, errorName: notif.error.name ?? 'unknown' })
    return NextResponse.json({ error: 'notification_failed' }, { status: 500 })
  }

  const confirm = await resend.emails.send({
    from: fromConfirm,
    to: data.email,
    reply_to: OHANA_EMAIL,
    subject: `We received your booking request, ${sanitizeForHeader(firstName)}!`,
    html: buildConfirmationHtml(data),
  })
  if (confirm.error) {
    log.error('confirmation_failed', { ip, errorName: confirm.error.name ?? 'unknown' })
    return NextResponse.json({ success: true, confirmationEmailFailed: true })
  }

  log.info('booking_submitted', { ip, package: data.package, hasMessage: !!data.message })
  return NextResponse.json({ success: true })
}
