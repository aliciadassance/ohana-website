'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Icon, Button, Logo } from './ui'

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/packages', label: 'Surf Packages' },
  { path: '/blog', label: 'Blog' },
  { path: '/booking', label: 'Booking Request' },
]

function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__msg">
          <Icon name="heart" />
          <span>Returning guest? Enjoy <strong>10% off</strong> your stay</span>
        </div>
        <div className="topbar__links">
          <a href="tel:+212650613372"><Icon name="phone" /> +212 650-613372</a>
          <a href="mailto:ohanasurfguiding@gmail.com"><Icon name="mail" /> ohanasurfguiding@gmail.com</a>
        </div>
      </div>
    </div>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname?.startsWith(path) ?? false

  return (
    <>
      <TopBar />
      <header className="header">
        <div className="container header__inner">
          <a className="logo-link" href="/">
            <Logo variant="horizontal" />
          </a>
          <nav className="nav" aria-label="Main">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`nav__item ${isActive(item.path) ? 'is-active' : ''}`}
                data-umami-event={`nav_${item.path === '/' ? 'home' : item.path.slice(1)}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header__cta">
            <Button variant="primary" size="sm" iconRight="arrow-right" href="/booking" umamiEvent="cta_book_now">
              Book Now
            </Button>
            <button className="mobile-menu-btn" aria-label="Open menu" onClick={() => setOpen(true)}>
              <Icon name="menu-2" />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-drawer__top">
          <button className="mobile-menu-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
            <Icon name="x" />
          </button>
        </div>
        <nav className="mobile-drawer__nav" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={isActive(item.path) ? 'is-active' : ''}
              onClick={() => setOpen(false)}
              data-umami-event={`nav_mobile_${item.path === '/' ? 'home' : item.path.slice(1)}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-drawer__cta">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            iconRight="arrow-right"
            href="/booking"
            onClick={() => setOpen(false)}
            umamiEvent="cta_mobile_book"
          >
            Book Your Stay
          </Button>
          <div className="mobile-drawer__contact">
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
              <Icon name="brand-whatsapp" />
              <a href="https://wa.me/212650613372" data-umami-event="contact_whatsapp">+212 650-613372</a>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Icon name="mail" />
              <a href="mailto:ohanasurfguiding@gmail.com" data-umami-event="contact_email">ohanasurfguiding@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
