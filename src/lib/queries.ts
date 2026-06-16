import { getPayloadClient } from './payload'
import type {
  Product,
  Solution,
  ProductCategory,
  SolutionCategory,
  Post,
  CaseStudy,
  Job,
  Category,
} from '@/payload-types'

/**
 * All public queries are wrapped so a missing/unreachable DB degrades to empty
 * results instead of crashing the page or the build. Pages render their empty
 * states; nothing throws at build time.
 */
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    console.error('[queries] data fetch failed:', (err as Error)?.message)
    return fallback
  }
}

const PUBLISHED = { status: { equals: 'published' } }

export async function getProductCategories(): Promise<ProductCategory[]> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'product-categories',
      where: PUBLISHED,
      sort: 'sortOrder',
      limit: 100,
      depth: 0,
    })
    return res.docs
  }, [])
}

export async function getProducts(): Promise<Product[]> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'products',
      where: PUBLISHED,
      sort: 'sortOrder',
      limit: 200,
      depth: 1,
    })
    return res.docs
  }, [])
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'products',
      where: { ...PUBLISHED, slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    return res.docs[0] ?? null
  }, null)
}

export async function getSolutionCategories(): Promise<SolutionCategory[]> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'solution-categories',
      where: PUBLISHED,
      sort: 'sortOrder',
      limit: 100,
      depth: 0,
    })
    return res.docs
  }, [])
}

export async function getSolutions(): Promise<Solution[]> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'solutions',
      where: PUBLISHED,
      sort: 'sortOrder',
      limit: 200,
      depth: 1,
    })
    return res.docs
  }, [])
}

export async function getSolutionBySlug(slug: string): Promise<Solution | null> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'solutions',
      where: { ...PUBLISHED, slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    return res.docs[0] ?? null
  }, null)
}

export async function getPosts(): Promise<Post[]> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'posts',
      where: PUBLISHED,
      sort: '-publishedAt',
      limit: 100,
      depth: 1,
    })
    return res.docs
  }, [])
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'posts',
      where: { ...PUBLISHED, slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    return res.docs[0] ?? null
  }, null)
}

export async function getCategories(): Promise<Category[]> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'categories', limit: 100, depth: 0 })
    return res.docs
  }, [])
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'case-studies',
      where: PUBLISHED,
      sort: '-publishedAt',
      limit: 100,
      depth: 1,
    })
    return res.docs
  }, [])
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'case-studies',
      where: { ...PUBLISHED, slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    return res.docs[0] ?? null
  }, null)
}

export async function getJobs(): Promise<Job[]> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'jobs',
      where: PUBLISHED,
      sort: '-publishedAt',
      limit: 100,
      depth: 1,
    })
    return res.docs
  }, [])
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'jobs',
      where: { ...PUBLISHED, slug: { equals: slug } },
      limit: 1,
      depth: 1,
    })
    return res.docs[0] ?? null
  }, null)
}

export async function getSiteSettings() {
  return safe(async () => {
    const payload = await getPayloadClient()
    return await payload.findGlobal({ slug: 'site-settings', depth: 1 })
  }, null)
}
