import type { CollectionConfig } from 'payload'
import { adminsOnly, publishedOrAdmin } from '@/access'
import { slugField } from '@/fields/slug'
import { statusField, sortOrderField } from '@/fields/status'

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  labels: { singular: 'Danh mục sản phẩm', plural: 'Danh mục sản phẩm' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'sortOrder', 'status'],
    group: 'Sản phẩm & Giải pháp',
  },
  access: {
    read: publishedOrAdmin,
    create: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Tên danh mục' },
    slugField('name'),
    { name: 'description', type: 'textarea', label: 'Mô tả' },
    sortOrderField,
    statusField,
  ],
}
