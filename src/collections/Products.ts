import type { CollectionConfig } from 'payload'
import { adminsOnly, publishedOrAdmin } from '@/access'
import { slugField } from '@/fields/slug'
import { statusField, sortOrderField } from '@/fields/status'
import { seoField } from '@/fields/seo'
import { ctasField, bulletArray, detailSectionsField } from '@/fields/common'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Sản phẩm', plural: 'Sản phẩm' },
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
            { name: 'name', type: 'text', required: true, label: 'Tên sản phẩm' },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'product-categories',
              label: 'Danh mục',
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              label: 'Mô tả ngắn',
              admin: { description: 'Hiển thị trên thẻ sản phẩm và mega menu.' },
            },
            { name: 'overview', type: 'richText', label: 'Tổng quan' },
            bulletArray('keyPoints', 'Điểm nổi bật'),
            bulletArray('features', 'Tính năng'),
            bulletArray('benefits', 'Lợi ích'),
            detailSectionsField,
            ctasField,
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
            {
              name: 'relatedSolutions',
              type: 'relationship',
              relationTo: 'solutions',
              hasMany: true,
              label: 'Giải pháp liên quan',
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
