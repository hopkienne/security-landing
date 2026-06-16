import type { Media } from '@/payload-types'

/** Join class names, dropping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

type MediaLike = number | Media | null | undefined

/** Resolve a Media relationship (which may be an id or a populated doc) to a URL. */
export function mediaUrl(media: MediaLike, size?: 'thumbnail' | 'card' | 'og'): string | null {
  if (!media || typeof media === 'number') return null
  if (size) {
    const sized = media.sizes?.[size]?.url
    if (sized) return sized
  }
  return media.url ?? null
}

/** Resolve a Media alt text safely. */
export function mediaAlt(media: MediaLike, fallback = ''): string {
  if (!media || typeof media === 'number') return fallback
  return media.alt || fallback
}

/** Format a date string into Vietnamese locale (dd/mm/yyyy). */
export function formatDateVi(date?: string | null): string {
  if (!date) return ''
  try {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date))
  } catch {
    return ''
  }
}
