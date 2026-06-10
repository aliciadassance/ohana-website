import type { Metadata } from 'next'
import SurfLabPage from '@/components/pages/SurfLabPage'

export const metadata: Metadata = {
  title: 'Surf Lab — Ohana Surf Morocco',
  description: 'A structured coaching program for intermediate to advanced surfers. Video analysis, theory sessions, and small group coaching designed to create real, lasting progression.',
}

export default function Page() {
  return <SurfLabPage />
}
