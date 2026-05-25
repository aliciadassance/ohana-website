import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileCTA from '@/components/MobileCTA'
import ScrollRevealInit from '@/components/ScrollRevealInit'
import '@/styles/tokens.css'
import '@/styles/base.css'
import '@/styles/components.css'
import '@/styles/layout.css'

export const metadata: Metadata = {
  title: {
    default: 'Ohana Surf Morocco — Surf & Stay with Yassin',
    template: '%s — Ohana Surf Morocco',
  },
  description:
    'Surf & Stay with pro surfer Yassin and his family at Ohana Surf Morocco. Small family-run surf camp in Aourir — pro coaching, home-cooked meals, year-round waves.',
  openGraph: {
    siteName: 'Ohana Surf Morocco',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Marcellus&family=Outfit:wght@300;400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.34.1/dist/tabler-icons.min.css"
          crossOrigin="anonymous"
        />
        <link rel="icon" type="image/png" href="/assets/LOGO-color-block.png" />
      </head>
      <body>
        <div className="app has-mobile-cta">
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
