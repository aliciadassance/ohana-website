import type { Metadata } from 'next'
import AboutPage from '@/components/pages/AboutPage'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet Yassin, Fatima and Hassan — the family behind Ohana Surf Morocco. Learn our story, the house, and what a day at camp feels like.',
}

export default function Page() {
  return <AboutPage />
}
