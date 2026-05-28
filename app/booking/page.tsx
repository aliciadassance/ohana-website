import type { Metadata } from 'next'
import BookingPage from '@/components/pages/BookingPage'

export const metadata: Metadata = {
  title: 'Booking Request',
  description: 'Book your stay at Ohana Surf Morocco. Choose your package, dates and surf level — we reply within 24h with availability and a full quote. No deposit to request.',
  alternates: { canonical: '/booking' },
  openGraph: {
    url: '/booking',
    title: 'Book Your Stay — Ohana Surf Morocco',
    description: 'Choose your package, dates and surf level — we reply within 24h with availability and a full quote. No deposit to request.',
    images: [
      {
        url: '/assets/images/booking-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Book a surf stay at Ohana Surf Morocco',
      },
    ],
  },
  twitter: {
    title: 'Book Your Stay — Ohana Surf Morocco',
    description: 'Choose your package, dates and surf level — we reply within 24h with availability and a full quote. No deposit to request.',
    images: ['/assets/images/booking-hero.jpg'],
  },
}

export default function Page() {
  return <BookingPage />
}
