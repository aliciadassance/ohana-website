import type { Metadata } from 'next'
import PackagesPage from '@/components/pages/PackagesPage'

export const metadata: Metadata = {
  title: 'Surf Packages',
  description: 'Compare four surf packages — Surf & Stay, Surf & Yoga, Surf & Pilates and Surf Only. Use the price simulator for an instant estimate. Family-run camp near Taghazout, from €30/day.',
  alternates: { canonical: '/packages' },
  openGraph: {
    url: '/packages',
    title: 'Surf Packages — Ohana Surf Morocco',
    description: 'Surf & Stay, Surf & Yoga, Surf & Pilates or Surf Only. Family-run camp near Taghazout from €30/day — use the price simulator for an instant estimate.',
    images: [
      {
        url: '/assets/images/packages-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Surf packages at Ohana Surf Morocco',
      },
    ],
  },
  twitter: {
    title: 'Surf Packages — Ohana Surf Morocco',
    description: 'Surf & Stay, Surf & Yoga, Surf & Pilates or Surf Only. Family-run camp near Taghazout from €30/day.',
    images: ['/assets/images/packages-hero.jpg'],
  },
}

export default function Page() {
  return <PackagesPage />
}
