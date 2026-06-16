import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import {
  getProducts,
  getSolutions,
  getPosts,
  getCaseStudies,
  getJobs,
} from '@/lib/queries'
import { vi } from '@/dictionaries/vi'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    vi.routes.about,
    vi.routes.products,
    vi.routes.solutions,
    vi.routes.customers,
    vi.routes.news,
    vi.routes.careers,
    vi.routes.contact,
    vi.routes.privacy,
    vi.routes.terms,
    vi.routes.cookies,
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }))

  const [products, solutions, posts, cases, jobs] = await Promise.all([
    getProducts(),
    getSolutions(),
    getPosts(),
    getCaseStudies(),
    getJobs(),
  ])

  const dynamicEntry = (path: string, updatedAt?: string) => ({
    url: `${SITE_URL}${path}`,
    lastModified: updatedAt ? new Date(updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  })

  return [
    ...staticRoutes,
    ...products.map((p) => dynamicEntry(`/san-pham/${p.slug}`, p.updatedAt)),
    ...solutions.map((s) => dynamicEntry(`/giai-phap/${s.slug}`, s.updatedAt)),
    ...posts.map((p) => dynamicEntry(`/tin-tuc/${p.slug}`, p.updatedAt)),
    ...cases.map((c) => dynamicEntry(`/khach-hang-du-an/${c.slug}`, c.updatedAt)),
    ...jobs.map((j) => dynamicEntry(`/tuyen-dung/${j.slug}`, j.updatedAt)),
  ]
}
