import type { CollectionConfig } from 'payload'
import { adminsOnly } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Hệ thống',
  },
  access: {
    read: adminsOnly,
    create: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Tên hiển thị',
    },
    {
      // Single role for phase 1, modelled as a select so RBAC can be extended later
      // without a schema migration.
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['admin'],
      options: [{ label: 'Quản trị viên', value: 'admin' }],
      admin: { position: 'sidebar' },
    },
  ],
}
