import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Outfit, Marcellus, Caveat } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileCTA from '@/components/MobileCTA'
import ScrollRevealInit from '@/components/ScrollRevealInit'
import '@/styles/tokens.css'
import '@/styles/base.css'
import '@/styles/components.css'
import '@/styles/layout.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-marcellus',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-caveat',
  display: 'swap',
})

const SITE_URL = 'https://www.ohana-surf-morocco.com'
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ohana Surf Morocco — Surf & Stay with Yassin',
    template: '%s — Ohana Surf Morocco',
  },
  description:
    'Surf & Stay with pro surfer Yassin and his family at Ohana Surf Morocco. Small family-run surf camp in Aourir — pro coaching, home-cooked meals, year-round waves.',
  alternates: { canonical: '/' },
  openGraph: {
    siteName: 'Ohana Surf Morocco',
    locale: 'en_US',
    type: 'website',
    url: SITE_URL,
    title: 'Ohana Surf Morocco — Surf & Stay with Yassin',
    description:
      'Family-run surf camp in Aourir, Morocco. Pro coaching, home-cooked meals, year-round waves.',
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
    card: 'summary_large_image',
    title: 'Ohana Surf Morocco — Surf & Stay with Yassin',
    description:
      'Family-run surf camp in Aourir, Morocco. Pro coaching, home-cooked meals, year-round waves.',
    images: ['/assets/images/hero-poster.jpg'],
  },
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Ohana Surf Morocco',
  description:
    'Family-run surf camp in Aourir, Morocco — surf coaching, accommodation and home-cooked meals.',
  url: SITE_URL,
  image: `${SITE_URL}/assets/images/booking-hero.jpg`,
  telephone: '+212-650-613372',
  email: 'ohanasurfguiding@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Aourir',
    addressRegion: 'Agadir',
    addressCountry: 'MA',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 30.4977, longitude: -9.6486 },
  sameAs: ['https://www.instagram.com/ohana_surfmorocco/'],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${marcellus.variable} ${caveat.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.34.1/dist/tabler-icons.min.css"
          crossOrigin="anonymous"
        />
        <link rel="icon" type="image/png" href="/assets/LOGO-color-block.png" />
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-component */}
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? '01c076b9-b125-44c6-a0bf-c1507cde2d56'}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body>
        <div className="app">
          <Header />
          <ScrollRevealInit />
          {children}
          <Footer />
          <MobileCTA />
        </div>
      </body>
    </html>
  )
}
