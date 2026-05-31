/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production'

const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cloud.umami.is https://static.cdn.prismic.io"
  : "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cloud.umami.is https://static.cdn.prismic.io"

const connectSrc = isDev
  ? "connect-src 'self' ws: wss: https://cloud.umami.is https://api-gateway.umami.dev https://ohana-website.cdn.prismic.io https://ohana-website.prismic.io"
  : "connect-src 'self' https://cloud.umami.is https://api-gateway.umami.dev https://ohana-website.cdn.prismic.io https://ohana-website.prismic.io"

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
      "img-src 'self' data: https:",
      "font-src 'self' data: https://cdn.jsdelivr.net",
      connectSrc,
      "frame-src https://www.youtube.com https://player.vimeo.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
]

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 200, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.prismic.io' },
      { protocol: 'https', hostname: '*.prismic.io' },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/our-story', destination: '/about', permanent: true },
      { source: '/the-house', destination: '/about', permanent: true },
      { source: '/s-projects-side-by-side', destination: '/about', permanent: true },
      { source: '/meet-the-team', destination: '/about', permanent: true },
      { source: '/surf-stay-packages', destination: '/packages', permanent: true },
      { source: '/packages-prices', destination: '/packages', permanent: true },
      { source: '/surf-coaching-guiding-only', destination: '/packages', permanent: true },
      { source: '/book-now', destination: '/booking', permanent: true },
      { source: '/book-online', destination: '/booking', permanent: true },
      { source: '/contact', destination: '/', permanent: true },
    ]
  },
}

module.exports = nextConfig
