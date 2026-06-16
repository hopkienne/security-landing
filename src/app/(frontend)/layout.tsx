import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/nav/Header'
import { Footer } from '@/components/nav/Footer'
import { SEOJsonLd } from '@/components/SEOJsonLd'
import { organizationJsonLd } from '@/lib/jsonld'
import { buildMetadata, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({}),
  icons: { icon: '/favicon.ico' },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-bg antialiased">
        <SEOJsonLd data={organizationJsonLd()} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
