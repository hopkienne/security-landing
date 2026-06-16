import type { Field } from 'payload'

/**
 * Convert arbitrary text (incl. Vietnamese with diacritics) into a clean,
 * SEO-friendly, unsigned ASCII slug. e.g. "Giải pháp bảo mật" -> "giai-phap-bao-mat".
 */
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip combining diacritics
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // drop anything not alnum/space/dash
    .replace(/[\s_-]+/g, '-') // collapse whitespace/underscores to single dash
    .replace(/^-+|-+$/g, '') // trim leading/trailing dashes
}

/**
 * Reusable slug field. Auto-derives from `sourceField` (default "name") when left
 * empty, and always normalizes any manually entered value. Indexed + unique.
 */
export function slugField(sourceField = 'name'): Field {
  return {
    name: 'slug',
    type: 'text',
    index: true,
    unique: true,
    admin: {
      position: 'sidebar',
      description: 'Tự sinh từ tên. Để trống để hệ thống tự tạo.',
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (typeof value === 'string' && value.length > 0) {
            return slugify(value)
          }
          const source = data?.[sourceField]
          if (typeof source === 'string' && source.length > 0) {
            return slugify(source)
          }
          return value
        },
      ],
    },
  }
}
