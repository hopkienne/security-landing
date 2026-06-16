import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { adminsOnly, anyone } from '@/access'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Nội dung',
  },
  access: {
    // Public site needs to read images; only admins manage them.
    // CV uploads from the careers form are created via the Local API (overrideAccess).
    read: anyone,
    create: adminsOnly,
    update: adminsOnly,
    delete: adminsOnly,
  },
  upload: {
    staticDir: path.resolve(dirname, '../../media'),
    mimeTypes: [
      'image/*',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Văn bản thay thế (alt)',
    },
  ],
}
