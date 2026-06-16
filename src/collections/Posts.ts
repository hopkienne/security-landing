import type { CollectionConfig } from 'payload'
import { adminsOnly, publishedOrAdmin } from '@/access'
import { slugField } from '@/fields/slug'
import { statusField } from '@/fields/status'
import { seoField } from '@/fields/seo'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Bài viết', plural: 'Bài viết' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'status'],
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
            { name: 'title', type: 'text', required: true, label: 'Tiêu đề' },
            { name: 'excerpt', type: 'textarea', label: 'Tóm tắt' },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Ảnh bìa',
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              label: 'Chuyên mục',
            },
            { name: 'content', type: 'richText', label: 'Nội dung' },
          ],
        },
        {
          label: 'SEO',
          fields: [seoField],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Ngày đăng',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    slugField('title'),
    statusField,
  ],
}
