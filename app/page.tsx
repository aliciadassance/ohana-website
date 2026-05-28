import type { Metadata } from 'next'
import HomePage from '@/components/pages/HomePage'

export const metadata: Metadata = {
  title: 'Ohana Surf Morocco — Surf & Stay with Yassin',
  description: 'Family-run surf camp near Taghazout, Morocco. Expert coaching, uncrowded waves, home-cooked meals — for every level. Come as a stranger, leave as family.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'Ohana Surf Morocco — Surf & Stay with Yassin',
    description: 'Family-run surf camp near Taghazout, Morocco. Expert coaching, uncrowded waves, home-cooked meals — for every level.',
    images: [
      {
        url: '/assets/images/hero-poster.jpg',
        width: 1200,
        height: 630,
        alt: 'Ohana Surf Morocco — waves at Aourir',
      },
    ],
  },
  twitter: {
    title: 'Ohana Surf Morocco — Surf & Stay with Yassin',
    description: 'Family-run surf camp near Taghazout, Morocco. Expert coaching, uncrowded waves, home-cooked meals — for every level.',
    images: ['/assets/images/hero-poster.jpg'],
  },
}

export default function Page() {
  return <HomePage />
}
