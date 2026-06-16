import type { Field } from 'payload'

/** Reusable CTA array: a list of {label, href} buttons. */
export const ctasField: Field = {
  name: 'ctas',
  type: 'array',
  label: 'Nút kêu gọi hành động (CTA)',
  labels: { singular: 'CTA', plural: 'CTA' },
  fields: [
    { name: 'label', type: 'text', required: true },
    {
      name: 'href',
      type: 'text',
      required: true,
      admin: { description: 'Đường dẫn nội bộ, ví dụ: /lien-he' },
    },
  ],
}

/** A simple list of short bullet strings, rendered as a `{name}` array of text. */
export function bulletArray(name: string, label: string): Field {
  return {
    name,
    type: 'array',
    label,
    labels: { singular: label, plural: label },
    fields: [{ name: 'item', type: 'text', required: true }],
  }
}
