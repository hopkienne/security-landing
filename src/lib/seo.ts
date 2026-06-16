import type { Metadata } from 'next'
import { BRAND } from '@/brand/tokens'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(
  /\/$/,
  '',
)

type BuildMetaArgs = {
  title?: string | null
  description?: string | null
  path?: string
  image?: string | null
  canonical?: string | null
  type?: 'website' | 'article'
}

/** Build a consistent Metadata object with OpenGraph + Twitter + canonical. */
export function buildMetadata({
  title,
  description,
  path = '/',
  image,
  canonical,
  type = 'website',
}: BuildMetaArgs): Metadata {
  const fullTitle = title ? `${title} · ${BRAND.name}` : `${BRAND.name} — ${BRAND.tagline}`
  const desc = description || BRAND.positioning
  const url = canonical || `${SITE_URL}${path}`
  const ogImage = image || `${SITE_URL}/secureops/og-default.png`

  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: BRAND.name,
      locale: 'vi_VN',
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
  }
}
