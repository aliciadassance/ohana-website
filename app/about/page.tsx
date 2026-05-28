import type { Metadata } from 'next'
import AboutPage from '@/components/pages/AboutPage'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet Yassin and the family behind Ohana Surf Morocco. Discover the house in Banana Village, a typical day at camp, and life beyond the waves — from Anchor Point to Paradise Valley.',
  alternates: { canonical: '/about' },
  openGraph: {
    url: '/about',
    title: 'About Us — Ohana Surf Morocco',
    description: 'Meet Yassin and the family behind Ohana Surf Morocco. Discover the house in Banana Village, a typical day at camp, and life beyond the waves.',
    images: [
      {
        url: '/assets/images/about-story.jpg',
        width: 1200,
        height: 630,
        alt: 'Yassin and the Ohana family in Aourir, Morocco',
      },
    ],
  },
  twitter: {
    title: 'About Us — Ohana Surf Morocco',
    description: 'Meet Yassin and the family behind Ohana Surf Morocco. Discover the house in Banana Village, a typical day at camp, and life beyond the waves.',
    images: ['/assets/images/about-story.jpg'],
  },
}

export default function Page() {
  return <AboutPage />
}
