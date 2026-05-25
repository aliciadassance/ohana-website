'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Icon, Button, Logo } from './ui'

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/packages', label: 'Surf Packages' },
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
  const router = useRouter()
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
          <a
            className="logo-link"
            href="/"
            onClick={(e) => { e.preventDefault(); router.push('/') }}
          >
            <Logo variant="horizontal" />
          </a>
          <nav className="nav" aria-label="Main">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.path}
                className={`nav__item ${isActive(item.path) ? 'is-active' : ''}`}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="header__cta">
            <Button variant="primary" size="sm" iconRight="arrow-right" onClick={() => router.push('/booking')}>
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
            <button
              key={item.path}
              className={isActive(item.path) ? 'is-active' : ''}
              onClick={() => { router.push(item.path); setOpen(false) }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mobile-drawer__cta">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            iconRight="arrow-right"
            onClick={() => { router.push('/booking'); setOpen(false) }}
          >
            Book Your Stay
          </Button>
          <div className="mobile-drawer__contact">
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
              <Icon name="brand-whatsapp" />
              <a href="https://wa.me/212650613372">+212 650-613372</a>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Icon name="mail" />
              <a href="mailto:ohanasurfguiding@gmail.com">ohanasurfguiding@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
