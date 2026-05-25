import type { Metadata } from 'next'
import HomePage from '@/components/pages/HomePage'

export const metadata: Metadata = {
  title: 'Ohana Surf Morocco — Surf & Stay with Yassin',
}

export default function Page() {
  return <HomePage />
}
