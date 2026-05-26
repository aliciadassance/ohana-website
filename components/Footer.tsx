'use client'

import { useRouter } from 'next/navigation'
import { Icon } from './ui'

const OHANA_EMAIL = 'ohanasurfguiding@gmail.com'

export default function Footer() {
  const router = useRouter()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <h4>Explore</h4>
            <ul>
              <li><button onClick={() => router.push('/')}>Home</button></li>
              <li><button onClick={() => router.push('/about')}>About Us</button></li>
              <li><button onClick={() => router.push('/packages')}>Surf Packages</button></li>
              <li><button onClick={() => router.push('/booking')}>Booking Request</button></li>
            </ul>
          </div>

          <div>
            <h4>The Camp</h4>
            <ul>
              <li><button onClick={() => router.push('/about')}>Our story</button></li>
              <li><button onClick={() => router.push('/about')}>The house</button></li>
              <li><button onClick={() => router.push('/about')}>A day at Ohana</button></li>
              <li><button onClick={() => router.push('/about')}>Meet the team</button></li>
            </ul>
          </div>

          <div>
            <h4>Get in Touch</h4>
            <ul>
              <li className="footer__contact-row">
                <Icon name="map-pin" /> <span>Aourir, Agadir - Morocco</span>
              </li>
              <li className="footer__contact-row">
                <Icon name="mail" />
                <a href={`mailto:${OHANA_EMAIL}`}>{OHANA_EMAIL}</a>
              </li>
              <li className="footer__contact-row">
                <Icon name="brand-whatsapp" />
                <a href="https://wa.me/212650613372">+212 650-613372</a>
              </li>
              <li className="footer__contact-row">
                <Icon name="clock" /> <span>Open year-round</span>
              </li>
            </ul>
          </div>

          <div>
            <h4>Follow Along</h4>
            <div className="footer__social" aria-label="Social links">
              <a href="https://www.instagram.com/ohana_surfmorocco/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Icon name="brand-instagram" />
              </a>
              <a href="https://web.facebook.com/Ohana-surf-morocco-104723238577665" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Icon name="brand-facebook" />
              </a>
              <a href="https://wa.me/212650613372" aria-label="WhatsApp">
                <Icon name="brand-whatsapp" />
              </a>
              <a href="https://maps.app.goo.gl/xrAbZNEVXHVC1Sr5A" aria-label="Google Maps" target="_blank" rel="noopener noreferrer">
                <Icon name="map-pin" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__legal">
          <div>© {new Date().getFullYear()} Ohana Surf Morocco · All rights reserved</div>
        </div>
      </div>
    </footer>
  )
}
