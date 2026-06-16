import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { ProductCategories } from './collections/ProductCategories'
import { Products } from './collections/Products'
import { SolutionCategories } from './collections/SolutionCategories'
import { Solutions } from './collections/Solutions'
import { Categories } from './collections/Categories'
import { Posts } from './collections/Posts'
import { CaseStudies } from './collections/CaseStudies'
import { Jobs } from './collections/Jobs'
import { Leads } from './collections/Leads'
import { JobApplications } from './collections/JobApplications'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const smtpConfigured = Boolean(process.env.SMTP_HOST)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: '· SecureOps',
    },
  },
  collections: [
    Users,
    Media,
    ProductCategories,
    Products,
    SolutionCategories,
    Solutions,
    Categories,
    Posts,
    CaseStudies,
    Jobs,
    Leads,
    JobApplications,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Email is optional: only wire SMTP when configured, otherwise Payload runs
  // without an email adapter and form actions log that notifications are skipped.
  email: smtpConfigured
    ? nodemailerAdapter({
        defaultFromName: 'SecureOps',
        defaultFromAddress: process.env.EMAIL_FROM || 'no-reply@secureops.vn',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        },
      })
    : undefined,
})
