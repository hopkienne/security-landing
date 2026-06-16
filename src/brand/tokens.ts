/**
 * SecureOps brand tokens — single source of truth for brand identity.
 *
 * Change values here (or the CSS variables in globals.css that mirror them) to
 * re-skin the entire site: name, colours, radius, spacing rhythm, CTA labels.
 */

export const BRAND_NAME = 'SecureOps'
export const BRAND_LOGO_TEXT = 'SecureOps'
export const BRAND_TAGLINE = 'Tư vấn & triển khai giải pháp an ninh mạng'

export const BRAND = {
  name: BRAND_NAME,
  logoText: BRAND_LOGO_TEXT,
  tagline: BRAND_TAGLINE,
  /** Positioning statement used in hero / about / structured data. */
  positioning:
    'Đơn vị tư vấn và triển khai giải pháp an ninh mạng cho doanh nghiệp, giúp phát hiện và phản ứng với mối đe dọa 24/7.',
  legalName: 'Công ty Cổ phần An ninh mạng SecureOps',
  email: 'lien-he@secureops.vn',
  phone: '+84 28 7300 0000',
  address: 'Tầng 12, Toà nhà Innovation, Quận 1, TP. Hồ Chí Minh',
  social: {
    linkedin: 'https://www.linkedin.com/company/secureops',
    facebook: 'https://www.facebook.com/secureops',
    youtube: 'https://www.youtube.com/@secureops',
  },
} as const

/**
 * Accent palette — cyber teal / cyan / electric blue. Deliberately NOT Sophos red.
 * These are mirrored as CSS custom properties in globals.css.
 */
export const COLORS = {
  primary: '#0ea5b7', // teal-cyan
  primaryDark: '#0b7c8a',
  primaryLight: '#3fd0df',
  accent: '#2563eb', // electric blue
  accentLight: '#60a5fa',
  ink: '#0b1220', // near-black headings
  slate: '#475569',
  bg: '#ffffff',
  bgSoft: '#f6f9fb',
  border: '#e3eaf0',
} as const

export const RADIUS = {
  sm: '0.375rem',
  md: '0.625rem',
  lg: '1rem',
  xl: '1.5rem',
} as const

/** Site-wide CTA labels. Primary CTA is "Liên hệ tư vấn" across the whole site. */
export const CTA = {
  primary: 'Liên hệ tư vấn',
  secondarySolutions: 'Xem giải pháp',
  secondaryProducts: 'Khám phá sản phẩm',
} as const
