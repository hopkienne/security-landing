import type { CollectionConfig } from 'payload'
import { adminsOnly, publishedOrAdmin } from '@/access'
import { slugField } from '@/fields/slug'
import { statusField, sortOrderField } from '@/fields/status'

export const SolutionCategories: CollectionConfig = {
  slug: 'solution-categories',
  labels: { singular: 'Nhóm giải pháp', plural: 'Nhóm giải pháp' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'sortOrder', 'status'],
    group: 'Sản phẩm & Giải pháp',
  },
  access: {
    read: publishedOrAdmin,
    create: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Tên nhóm' },
    slugField('name'),
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'general',
      label: 'Loại',
      options: [
        { label: 'Theo tình huống (use case)', value: 'use_case' },
        { label: 'Theo ngành', value: 'industry' },
        { label: 'Tuân thủ', value: 'compliance' },
        { label: 'Tổng quát', value: 'general' },
      ],
    },
    { name: 'description', type: 'textarea', label: 'Mô tả' },
    sortOrderField,
    statusField,
  ],
}
