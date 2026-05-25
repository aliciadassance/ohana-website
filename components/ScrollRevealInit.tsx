'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollRevealInit() {
  const pathname = usePathname()

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [pathname])

  return null
}
