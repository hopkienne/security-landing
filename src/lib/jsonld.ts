import { BRAND } from '@/brand/tokens'
import { SITE_URL } from './seo'

type JsonLd = Record<string, unknown>

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: SITE_URL,
    description: BRAND.positioning,
    email: BRAND.email,
    telephone: BRAND.phone,
    address: { '@type': 'PostalAddress', streetAddress: BRAND.address, addressCountry: 'VN' },
    sameAs: [BRAND.social.linkedin, BRAND.social.facebook, BRAND.social.youtube],
  }
}

export function articleJsonLd(opts: {
  title: string
  description?: string | null
  url: string
  image?: string | null
  datePublished?: string | null
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description || undefined,
    image: opts.image || undefined,
    datePublished: opts.datePublished || undefined,
    mainEntityOfPage: opts.url,
    author: { '@type': 'Organization', name: BRAND.name },
    publisher: { '@type': 'Organization', name: BRAND.name },
  }
}

export function serviceJsonLd(opts: {
  name: string
  description?: string | null
  url: string
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description || undefined,
    url: opts.url,
    provider: { '@type': 'Organization', name: BRAND.name, url: SITE_URL },
    areaServed: 'VN',
  }
}

export function jobPostingJsonLd(opts: {
  title: string
  description?: string | null
  datePosted?: string | null
  employmentType?: string | null
  location?: string | null
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: opts.title,
    description: opts.description || opts.title,
    datePosted: opts.datePosted || undefined,
    employmentType: opts.employmentType || undefined,
    hiringOrganization: { '@type': 'Organization', name: BRAND.name, sameAs: SITE_URL },
    jobLocation: opts.location
      ? { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: opts.location } }
      : undefined,
  }
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
