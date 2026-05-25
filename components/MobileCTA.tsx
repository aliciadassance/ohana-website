'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui'

export default function MobileCTA() {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/booking') return null

  return (
    <div className="mobile-cta">
      <Button variant="ink" fullWidth iconLeft="brand-whatsapp" href="https://wa.me/212650613372" ariaLabel="Chat on WhatsApp">
        WhatsApp
      </Button>
      <Button variant="primary" fullWidth iconRight="arrow-right" onClick={() => router.push('/booking')}>
        Book Now
      </Button>
    </div>
  )
}
