import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const OHANA_EMAIL = 'ohanasurfguiding@gmail.com'

function buildNotificationHtml(s: Record<string, string | boolean>): string {
  const row = (label: string, value: string | boolean) =>
    value
      ? `<tr><td style="padding:8px 12px;font-family:sans-serif;font-size:14px;color:#555;border-bottom:1px solid #f0ede6;width:35%;white-space:nowrap">${label}</td><td style="padding:8px 12px;font-family:sans-serif;font-size:14px;color:#1a1a1a;border-bottom:1px solid #f0ede6;font-weight:500">${value}</td></tr>`
      : ''

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f7f3ec">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f3ec;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
        <!-- Header -->
        <tr>
          <td style="background:#143b45;padding:28px 32px">
            <p style="margin:0;font-family:sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.6)">New booking request</p>
            <h1 style="margin:8px 0 0;font-family:Georgia,serif;font-size:28px;color:white;font-weight:400">Ohana Surf Morocco</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:28px 32px 8px">
            <p style="font-family:sans-serif;font-size:16px;color:#1a1a1a;margin:0 0 4px"><strong>${s.fullName}</strong> wants to book a stay!</p>
            <p style="font-family:sans-serif;font-size:14px;color:#6b6760;margin:0">Submitted via the website booking form. Reply directly to this email to reach the guest.</p>
          </td>
        </tr>
        <!-- Trip section -->
        <tr><td style="padding:20px 32px 4px"><p style="font-family:sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#e48424;margin:0;font-weight:600">The trip</p></td></tr>
        <tr><td style="padding:0 20px">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0ede6;border-radius:8px;overflow:hidden">
            ${row('Package', s.package as string)}
            ${row('Arrival', s.arrival as string)}
            ${row('Departure', s.departure as string)}
            ${row('Guests', s.guests as string)}
            ${row('Surf level', s.level as string)}
            ${row('Room preference', s.accommodation as string)}
            ${row('Returning guest', s.returning ? 'Yes — apply 10% discount' : '')}
          </table>
        </td></tr>
        <!-- Contact section -->
        <tr><td style="padding:20px 32px 4px"><p style="font-family:sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#e48424;margin:0;font-weight:600">Contact</p></td></tr>
        <tr><td style="padding:0 20px">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0ede6;border-radius:8px;overflow:hidden">
            ${row('Name', s.fullName as string)}
            ${row('Email', s.email as string)}
            ${row('Phone / WhatsApp', s.phone as string)}
            ${row('Country', s.country as string)}
          </table>
        </td></tr>
        <!-- Extras section -->
        <tr><td style="padding:20px 32px 4px"><p style="font-family:sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#e48424;margin:0;font-weight:600">Extras & logistics</p></td></tr>
        <tr><td style="padding:0 20px">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0ede6;border-radius:8px;overflow:hidden">
            ${row('Pickup', s.pickup as string)}
            ${row('Dietary requirements', s.diet as string)}
            ${row('How they heard about us', s.referral as string)}
            ${row('Newsletter opt-in', s.marketing ? 'Yes' : '')}
          </table>
        </td></tr>
        ${s.message ? `
        <!-- Message -->
        <tr><td style="padding:20px 32px 4px"><p style="font-family:sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#e48424;margin:0;font-weight:600">Their message</p></td></tr>
        <tr><td style="padding:0 20px 8px">
          <div style="background:#f7f3ec;border-radius:8px;padding:16px 20px;font-family:sans-serif;font-size:14px;color:#1a1a1a;line-height:1.6">${s.message}</div>
        </td></tr>
        ` : ''}
        <!-- Footer -->
        <tr>
          <td style="padding:24px 32px;border-top:1px solid #f0ede6;text-align:center">
            <p style="font-family:sans-serif;font-size:12px;color:#999;margin:0">
              Reply to this email to respond directly to ${s.fullName} at ${s.email}
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function buildConfirmationHtml(s: Record<string, string | boolean>): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f7f3ec">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f3ec;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
        <!-- Header -->
        <tr>
          <td style="background:#143b45;padding:28px 32px;text-align:center">
            <p style="margin:0;font-family:sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.6)">Booking request received</p>
            <h1 style="margin:8px 0 0;font-family:Georgia,serif;font-size:28px;color:white;font-weight:400">Ohana Surf Morocco</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 32px 24px;text-align:center">
            <p style="font-family:Georgia,serif;font-size:22px;color:#143b45;margin:0 0 16px">Salaam ${s.fullName}! 🤙</p>
            <p style="font-family:sans-serif;font-size:15px;color:#6b6760;line-height:1.6;margin:0 0 12px">
              We've received your booking request and will reply within <strong style="color:#1a1a1a">24 hours</strong> with availability, your full quote, and next steps.
            </p>
            <p style="font-family:sans-serif;font-size:15px;color:#6b6760;line-height:1.6;margin:0">
              In the meantime, feel free to reach us directly on WhatsApp — we usually answer faster there.
            </p>
          </td>
        </tr>
        <!-- Summary box -->
        <tr>
          <td style="padding:0 32px 28px">
            <div style="background:#f7f3ec;border-radius:10px;padding:20px 24px">
              <p style="font-family:sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#e48424;margin:0 0 12px;font-weight:600">Your request summary</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="font-family:sans-serif;font-size:14px;color:#6b6760;padding:3px 0">Package</td><td style="font-family:sans-serif;font-size:14px;color:#1a1a1a;font-weight:600;text-align:right">${s.package}</td></tr>
                <tr><td style="font-family:sans-serif;font-size:14px;color:#6b6760;padding:3px 0">Dates</td><td style="font-family:sans-serif;font-size:14px;color:#1a1a1a;font-weight:600;text-align:right">${s.arrival} → ${s.departure}</td></tr>
                <tr><td style="font-family:sans-serif;font-size:14px;color:#6b6760;padding:3px 0">Guests</td><td style="font-family:sans-serif;font-size:14px;color:#1a1a1a;font-weight:600;text-align:right">${s.guests}</td></tr>
                ${s.returning ? '<tr><td style="font-family:sans-serif;font-size:14px;color:#e48424;padding:3px 0;font-weight:500" colspan="2">✓ Returning guest discount (10%) applied</td></tr>' : ''}
              </table>
            </div>
          </td>
        </tr>
        <!-- CTA -->
        <tr>
          <td style="padding:0 32px 32px;text-align:center">
            <a href="https://wa.me/212600000000" style="display:inline-block;background:#e48424;color:white;font-family:sans-serif;font-size:14px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;padding:14px 28px;border-radius:999px;text-decoration:none">
              Chat on WhatsApp
            </a>
            <p style="font-family:sans-serif;font-size:12px;color:#aaa;margin:16px 0 0">or reply to this email anytime</p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #f0ede6;text-align:center">
            <p style="font-family:sans-serif;font-size:12px;color:#aaa;margin:0">
              Ohana Surf Morocco · Aourir, Agadir · <a href="mailto:${OHANA_EMAIL}" style="color:#aaa">${OHANA_EMAIL}</a>
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
  const resendKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'booking@yourdomain.com'
  const fromConfirm = process.env.RESEND_FROM_CONFIRM || `Ohana Surf Morocco <hello@yourdomain.com>`

  if (!resendKey) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
  }

  let body: Record<string, string | boolean>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { fullName, email, arrival, departure } = body as { fullName: string; email: string; arrival: string; departure: string }

  if (!fullName || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const resend = new Resend(resendKey)

  try {
    // Notify Yassin/the team
    await resend.emails.send({
      from: fromEmail,
      to: OHANA_EMAIL,
      reply_to: email,
      subject: `New booking request from ${fullName} (${arrival} → ${departure})`,
      html: buildNotificationHtml(body),
    })

    // Confirm to the guest
    await resend.emails.send({
      from: fromConfirm,
      to: email,
      subject: `We received your booking request, ${fullName.split(' ')[0]}!`,
      html: buildConfirmationHtml(body),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
