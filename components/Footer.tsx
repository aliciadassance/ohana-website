'use client'

import { Icon } from './ui'

const OHANA_EMAIL = 'ohanasurfguiding@gmail.com'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/packages">Surf Packages</a></li>
              <li><a href="/booking">Booking Request</a></li>
            </ul>
          </div>

          <div>
            <h4>The Camp</h4>
            <ul>
              <li><a href="/about#story">Our story</a></li>
              <li><a href="/about#house">The house</a></li>
              <li><a href="/about#day">A day at Ohana</a></li>
              <li><a href="/about#team">Meet the team</a></li>
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
                <a href={`mailto:${OHANA_EMAIL}`} data-umami-event="contact_email">{OHANA_EMAIL}</a>
              </li>
              <li className="footer__contact-row">
                <Icon name="brand-whatsapp" />
                <a href="https://wa.me/212650613372" data-umami-event="contact_whatsapp">+212 650-613372</a>
              </li>
              <li className="footer__contact-row">
                <Icon name="clock" /> <span>Open year-round</span>
              </li>
            </ul>
          </div>

          <div>
            <h4>Follow Along</h4>
            <div className="footer__social" aria-label="Social links">
              <a href="https://www.instagram.com/ohana_surfmorocco/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" data-umami-event="social_instagram">
                <Icon name="brand-instagram" />
              </a>
              <a href="https://web.facebook.com/Ohana-surf-morocco-104723238577665" aria-label="Facebook" target="_blank" rel="noopener noreferrer" data-umami-event="social_facebook">
                <Icon name="brand-facebook" />
              </a>
              <a href="https://wa.me/212650613372" aria-label="WhatsApp" data-umami-event="contact_whatsapp">
                <Icon name="brand-whatsapp" />
              </a>
              <a href="https://maps.app.goo.gl/xrAbZNEVXHVC1Sr5A" aria-label="Google Maps" target="_blank" rel="noopener noreferrer" data-umami-event="social_google_maps">
                <Icon name="map-pin" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__legal">
          <div>© {new Date().getFullYear()} Ohana Surf Morocco is a trade name of Lani Surf Morocco SARL, the legal entity responsible for all bookings and services · All rights reserved</div>
        </div>
      </div>
    </footer>
  )
}
