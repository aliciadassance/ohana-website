import type { Metadata } from 'next'
import BookingPage from '@/components/pages/BookingPage'

export const metadata: Metadata = {
  title: 'Booking Request',
  description: 'Request your stay at Ohana Surf Morocco. Tell us your dates, package and surf level — we reply within 24h with availability and a full quote. No deposit needed.',
}

export default function Page() {
  return <BookingPage />
}
