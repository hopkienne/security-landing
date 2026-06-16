import type { CollectionConfig } from 'payload'
import { adminsOnly, anyone } from '@/access'

export const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Yêu cầu tư vấn', plural: 'Yêu cầu tư vấn' },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'company', 'email', 'needType', 'status', 'createdAt'],
    group: 'Liên hệ',
  },
  access: {
    // Public visitors may submit (create) but never read/list leads.
    create: anyone,
    read: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    { name: 'fullName', type: 'text', required: true, label: 'Họ và tên' },
    { name: 'company', type: 'text', label: 'Công ty' },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'phone', type: 'text', label: 'Số điện thoại' },
    {
      name: 'needType',
      type: 'select',
      label: 'Nhu cầu',
      options: [
        { label: 'Sản phẩm', value: 'product' },
        { label: 'Giải pháp', value: 'solution' },
        { label: 'Tư vấn bảo mật', value: 'consulting' },
        { label: 'Hỗ trợ khác', value: 'other' },
      ],
    },
    {
      name: 'companySize',
      type: 'select',
      label: 'Quy mô doanh nghiệp',
      options: [
        { label: '1–50', value: '1-50' },
        { label: '51–200', value: '51-200' },
        { label: '201–1000', value: '201-1000' },
        { label: 'Trên 1000', value: '1000+' },
      ],
    },
    { name: 'message', type: 'textarea', label: 'Nội dung' },
    {
      name: 'sourcePage',
      type: 'text',
      label: 'Trang gửi từ',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      label: 'Trạng thái',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Mới', value: 'new' },
        { label: 'Đã liên hệ', value: 'contacted' },
        { label: 'Đang tư vấn', value: 'in_progress' },
        { label: 'Đóng', value: 'closed' },
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
