import type { CollectionConfig } from 'payload'
import { adminsOnly, publishedOrAdmin } from '@/access'
import { slugField } from '@/fields/slug'
import { statusField } from '@/fields/status'
import { seoField } from '@/fields/seo'
import { bulletArray } from '@/fields/common'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: { singular: 'Tin tuyển dụng', plural: 'Tin tuyển dụng' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'department', 'location', 'status'],
    group: 'Tuyển dụng',
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
          label: 'Thông tin',
          fields: [
            { name: 'title', type: 'text', required: true, label: 'Vị trí' },
            { name: 'department', type: 'text', label: 'Phòng ban' },
            { name: 'location', type: 'text', label: 'Địa điểm' },
            {
              name: 'workType',
              type: 'select',
              label: 'Hình thức',
              defaultValue: 'full-time',
              options: [
                { label: 'Toàn thời gian', value: 'full-time' },
                { label: 'Bán thời gian', value: 'part-time' },
                { label: 'Hợp đồng', value: 'contract' },
                { label: 'Từ xa', value: 'remote' },
                { label: 'Linh hoạt (hybrid)', value: 'hybrid' },
              ],
            },
            { name: 'experienceLevel', type: 'text', label: 'Cấp độ kinh nghiệm' },
            { name: 'salaryRange', type: 'text', label: 'Mức lương' },
            { name: 'summary', type: 'textarea', label: 'Mô tả ngắn' },
            bulletArray('responsibilities', 'Trách nhiệm'),
            bulletArray('requirements', 'Yêu cầu'),
            bulletArray('benefits', 'Quyền lợi'),
            {
              name: 'applicationEmail',
              type: 'email',
              label: 'Email nhận hồ sơ (tuỳ chọn)',
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
      name: 'publishedAt',
      type: 'date',
      label: 'Ngày đăng',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    slugField('title'),
    statusField,
  ],
}
