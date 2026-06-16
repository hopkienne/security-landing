import type { CollectionConfig } from 'payload'
import { adminsOnly, anyone } from '@/access'

export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  labels: { singular: 'Hồ sơ ứng tuyển', plural: 'Hồ sơ ứng tuyển' },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'job', 'email', 'status', 'createdAt'],
    group: 'Tuyển dụng',
  },
  access: {
    create: anyone,
    read: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    {
      name: 'job',
      type: 'relationship',
      relationTo: 'jobs',
      label: 'Vị trí ứng tuyển',
    },
    { name: 'fullName', type: 'text', required: true, label: 'Họ và tên' },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'phone', type: 'text', label: 'Số điện thoại' },
    { name: 'portfolioUrl', type: 'text', label: 'Portfolio / LinkedIn' },
    {
      name: 'cvFile',
      type: 'upload',
      relationTo: 'media',
      label: 'CV',
    },
    { name: 'coverMessage', type: 'textarea', label: 'Thư giới thiệu' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      label: 'Trạng thái',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Mới', value: 'new' },
        { label: 'Đang xem', value: 'reviewing' },
        { label: 'Phỏng vấn', value: 'interview' },
        { label: 'Từ chối', value: 'rejected' },
        { label: 'Nhận', value: 'hired' },
      ],
    },
    {
      name: 'internalNote',
      type: 'textarea',
      label: 'Ghi chú nội bộ',
      access: {
        read: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
      },
    },
  ],
}
