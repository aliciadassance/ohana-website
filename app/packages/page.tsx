import type { Metadata } from 'next'
import PackagesPage from '@/components/pages/PackagesPage'

export const metadata: Metadata = {
  title: 'Surf Packages',
  description: 'Choose your Ohana surf package — Surf & Stay, Surf & Yoga, Surf & Pilates, or Surf Only. All-inclusive prices from €30/day. Family-run camp in Aourir, Morocco.',
}

export default function Page() {
  return <PackagesPage />
}
