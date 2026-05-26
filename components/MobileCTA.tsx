'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Icon } from './ui'

export default function MobileCTA() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname === '/booking') return null

  return (
    <a
      href="https://wa.me/212650613372"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`whatsapp-fab${visible ? ' is-visible' : ''}`}
    >
      <Icon name="brand-whatsapp" />
    </a>
  )
}
