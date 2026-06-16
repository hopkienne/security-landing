import type { CollectionConfig } from 'payload'
import { adminsOnly, publishedOrAdmin } from '@/access'
import { slugField } from '@/fields/slug'
import { statusField } from '@/fields/status'
import { seoField } from '@/fields/seo'
import { bulletArray } from '@/fields/common'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Khách hàng / Dự án', plural: 'Khách hàng / Dự án' },
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'industry', 'publishedAt', 'status'],
    group: 'Tin tức',
  },
  access: {
    read: publishedOrAdmin,
    create: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Nội dung',
          fields: [
            { name: 'clientName', type: 'text', required: true, label: 'Tên khách hàng' },
            { name: 'industry', type: 'text', label: 'Ngành' },
            { name: 'summary', type: 'textarea', label: 'Tóm tắt' },
            { name: 'challenge', type: 'richText', label: 'Thách thức' },
            { name: 'solution', type: 'richText', label: 'Giải pháp' },
            bulletArray('results', 'Kết quả'),
            {
              name: 'testimonial',
              type: 'group',
              label: 'Trích dẫn khách hàng',
              fields: [
                { name: 'quote', type: 'textarea', label: 'Nội dung' },
                { name: 'author', type: 'text', label: 'Người phát biểu' },
                { name: 'role', type: 'text', label: 'Chức vụ' },
              ],
            },
          ],
        },
        {
          label: 'Liên kết',
          fields: [
            {
              name: 'relatedProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              label: 'Sản phẩm liên quan',
            },
          ],
        },
        {
          label: 'SEO',
          fields: [seoField],
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo khách hàng',
      admin: { position: 'sidebar' },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Ảnh bìa',
      admin: { position: 'sidebar' },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Thư viện ảnh',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Ngày đăng',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    slugField('clientName'),
    statusField,
  ],
}
