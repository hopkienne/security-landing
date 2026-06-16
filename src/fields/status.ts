import type { Field } from 'payload'

/**
 * Draft/published status select. Used by content collections that don't need full
 * version history. Public queries filter on `status = 'published'`.
 */
export const statusField: Field = {
  name: 'status',
  type: 'select',
  required: true,
  defaultValue: 'draft',
  index: true,
  admin: {
    position: 'sidebar',
  },
  options: [
    { label: 'Bản nháp', value: 'draft' },
    { label: 'Đã xuất bản', value: 'published' },
  ],
}

/** Shared sort-order field for manually ordered collections. */
export const sortOrderField: Field = {
  name: 'sortOrder',
  type: 'number',
  defaultValue: 0,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'Số nhỏ hiển thị trước.',
  },
}
