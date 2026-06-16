import type { Field } from 'payload'

/**
 * Reusable SEO field group. Added to content collections so editors can override
 * per-page metadata. Empty values fall back to sensible defaults at render time.
 */
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  admin: {
    description: 'Tối ưu hiển thị trên công cụ tìm kiếm và mạng xã hội.',
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta title',
      admin: { description: 'Tiêu đề hiển thị trên Google (≈ 60 ký tự).' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta description',
      admin: { description: 'Mô tả ngắn hiển thị trên Google (≈ 160 ký tự).' },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Ảnh chia sẻ (OG image)',
    },
    {
      name: 'canonical',
      type: 'text',
      label: 'Canonical URL',
      admin: { description: 'Để trống để dùng URL mặc định của trang.' },
    },
  ],
}
