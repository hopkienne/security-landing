import type { GlobalConfig } from 'payload'
import { adminsOnly, anyone } from '@/access'
import { BRAND, CTA } from '@/brand/tokens'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Cấu hình website',
  admin: { group: 'Hệ thống' },
  access: {
    read: anyone,
    update: adminsOnly,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Thương hiệu',
          fields: [
            { name: 'brandName', type: 'text', defaultValue: BRAND.name, label: 'Tên thương hiệu' },
            { name: 'tagline', type: 'text', defaultValue: BRAND.tagline, label: 'Slogan' },
          ],
        },
        {
          label: 'Liên hệ',
          fields: [
            { name: 'phone', type: 'text', defaultValue: BRAND.phone, label: 'Điện thoại' },
            { name: 'email', type: 'email', defaultValue: BRAND.email, label: 'Email' },
            { name: 'address', type: 'textarea', defaultValue: BRAND.address, label: 'Địa chỉ' },
          ],
        },
        {
          label: 'Mạng xã hội',
          fields: [
            { name: 'linkedin', type: 'text', defaultValue: BRAND.social.linkedin },
            { name: 'facebook', type: 'text', defaultValue: BRAND.social.facebook },
            { name: 'youtube', type: 'text', defaultValue: BRAND.social.youtube },
          ],
        },
        {
          label: 'CTA & SEO',
          fields: [
            { name: 'ctaPrimary', type: 'text', defaultValue: CTA.primary, label: 'CTA chính' },
            {
              name: 'ctaSecondary',
              type: 'text',
              defaultValue: CTA.secondarySolutions,
              label: 'CTA phụ',
            },
            {
              name: 'defaultSeo',
              type: 'group',
              label: 'SEO mặc định',
              fields: [
                { name: 'metaTitle', type: 'text' },
                { name: 'metaDescription', type: 'textarea' },
                { name: 'ogImage', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
