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
 * Palette — Sophos-inspired: electric blue as the action colour, with cyan and
 * turquoise as gradient accents (no orange), and a deep navy for dark sections.
 * Values mirror the real Sophos design tokens and are exposed as CSS custom
 * properties in globals.css (consumed by Tailwind v4 via @theme).
 */
export const COLORS = {
  primary: '#2006f7', // electric blue (action colour)
  primaryDark: '#1a05c6', // hover
  primaryLight: '#3080ff',
  cyan: '#00edff', // gradient accent
  turquoise: '#00f2b3', // gradient accent
  sky: '#009cfb',
  navy: '#0a143a', // deep navy for dark sections
  navyDeep: '#08012d', // darkest navy (gradient base)
  oxford: '#001a47', // oxford blue
  ink: '#0a143a', // near-navy headings
  slate: '#62748e',
  bg: '#ffffff',
  bgSoft: '#f3f4f6',
  border: '#e2e8f0',
} as const

export const RADIUS = {
  sm: '0.625rem', // 10px
  md: '1.25rem', // 20px
  lg: '1.875rem', // 30px (pill buttons)
  xl: '2.5rem',
} as const

/** Site-wide CTA labels. Primary CTA is "Liên hệ tư vấn" across the whole site. */
export const CTA = {
  primary: 'Liên hệ tư vấn',
  secondarySolutions: 'Xem giải pháp',
  secondaryProducts: 'Khám phá sản phẩm',
} as const
