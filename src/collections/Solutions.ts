import type { CollectionConfig } from 'payload'
import { adminsOnly, publishedOrAdmin } from '@/access'
import { slugField } from '@/fields/slug'
import { statusField, sortOrderField } from '@/fields/status'
import { seoField } from '@/fields/seo'
import { ctasField, bulletArray, detailSectionsField } from '@/fields/common'

export const Solutions: CollectionConfig = {
  slug: 'solutions',
  labels: { singular: 'Giải pháp', plural: 'Giải pháp' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'sortOrder', 'status'],
    group: 'Sản phẩm & Giải pháp',
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
            { name: 'name', type: 'text', required: true, label: 'Tên giải pháp' },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'solution-categories',
              label: 'Nhóm giải pháp',
            },
            { name: 'shortDescription', type: 'textarea', label: 'Mô tả ngắn' },
            { name: 'overview', type: 'richText', label: 'Tổng quan' },
            bulletArray('painPoints', 'Thách thức'),
            bulletArray('benefits', 'Lợi ích'),
            detailSectionsField,
            ctasField,
          ],
        },
        {
          label: 'Liên kết',
          fields: [
            {
              name: 'recommendedProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              label: 'Sản phẩm đề xuất',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Ảnh / icon',
      admin: { position: 'sidebar' },
    },
    sortOrderField,
    statusField,
    {
      name: 'catalogManaged',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      label: 'Catalog managed',
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'catalogSource',
      type: 'text',
      label: 'Catalog source',
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'catalogSourcePath',
      type: 'textarea',
      label: 'Catalog source path',
      admin: { position: 'sidebar', readOnly: true },
    },
    slugField('name'),
  ],
}
