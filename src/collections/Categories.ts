import type { CollectionConfig } from 'payload'
import { adminsOnly, anyone } from '@/access'
import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Chuyên mục', plural: 'Chuyên mục' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
    group: 'Tin tức',
  },
  access: {
    read: anyone,
    create: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Tên chuyên mục' },
    slugField('name'),
    { name: 'description', type: 'textarea', label: 'Mô tả' },
  ],
}
