import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/nav/Header'
import { Footer } from '@/components/nav/Footer'
import { SEOJsonLd } from '@/components/SEOJsonLd'
import { organizationJsonLd } from '@/lib/jsonld'
import { buildMetadata, SITE_URL } from '@/lib/seo'

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({}),
  icons: {
    icon: [
      { url: '/secureops/favicon-mark-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/secureops/favicon-mark.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/secureops/favicon-mark-180.png',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="min-h-screen bg-bg antialiased">
        <SEOJsonLd data={organizationJsonLd()} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
