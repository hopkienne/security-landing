import 'dotenv/config'
import { getPayload } from 'payload'
import type { Payload } from 'payload'
import config from './payload.config'
import { richText } from './lib/lexical'
import {
  productCategories,
  products,
  solutionCategories,
  solutions,
  postCategories,
  samplePosts,
  sampleCaseStudies,
  sampleJobs,
} from './seed-data'

const FORCE = process.argv.includes('--force')

/**
 * Idempotent upsert by slug. By default, if a record already exists it is left
 * untouched (so admin edits survive re-seeds). With --force, existing records are
 * overwritten with the seed data.
 */
async function upsert(
  payload: Payload,
  collection: Parameters<Payload['find']>[0]['collection'],
  slug: string,
  data: Record<string, unknown>,
): Promise<number> {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs[0]) {
    const id = existing.docs[0].id as number
    if (FORCE) {
      await payload.update({ collection, id, data, overrideAccess: true })
      console.log(`  ~ updated ${collection}/${slug}`)
    } else {
      console.log(`  = skipped ${collection}/${slug} (exists)`)
    }
    return id
  }

  const created = await payload.create({ collection, data, overrideAccess: true })
  console.log(`  + created ${collection}/${slug}`)
  return created.id as number
}

async function seed() {
  const payload = await getPayload({ config })
  console.log(`\n🌱 Seeding SecureOps content${FORCE ? ' (--force)' : ''}...\n`)

  // 1. Admin user
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@secureops.vn'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'SecureOps#2026'
  const existingAdmin = await payload.find({
    collection: 'users',
    where: { email: { equals: adminEmail } },
    limit: 1,
    overrideAccess: true,
  })
  if (existingAdmin.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: { email: adminEmail, password: adminPassword, name: 'Quản trị viên', roles: ['admin'] },
      overrideAccess: true,
    })
    console.log(`👤 Admin created: ${adminEmail} / ${adminPassword}`)
  } else {
    console.log(`👤 Admin exists: ${adminEmail}`)
  }

  // 2. Product categories
  console.log('\n📁 Product categories')
  const productCatIds = new Map<string, number>()
  for (const cat of productCategories) {
    const id = await upsert(payload, 'product-categories', cat.slug, {
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      sortOrder: cat.sortOrder,
      status: 'published',
    })
    productCatIds.set(cat.slug, id)
  }

  // 3. Products
  console.log('\n🛡️  Products')
  for (const p of products) {
    await upsert(payload, 'products', p.slug, {
      name: p.name,
      slug: p.slug,
      category: productCatIds.get(p.categorySlug),
      shortDescription: p.shortDescription,
      overview: richText(p.overview),
      keyPoints: p.keyPoints.map((item) => ({ item })),
      features: p.features.map((item) => ({ item })),
      benefits: p.benefits.map((item) => ({ item })),
      ctas: [{ label: 'Liên hệ tư vấn', href: '/lien-he' }],
      sortOrder: p.sortOrder,
      status: 'published',
    })
  }

  // 4. Solution categories
  console.log('\n📁 Solution categories')
  const solutionCatIds = new Map<string, number>()
  for (const cat of solutionCategories) {
    const id = await upsert(payload, 'solution-categories', cat.slug, {
      name: cat.name,
      slug: cat.slug,
      type: cat.type,
      description: cat.description,
      sortOrder: cat.sortOrder,
      status: 'published',
    })
    solutionCatIds.set(cat.slug, id)
  }

  // 5. Solutions
  console.log('\n🎯 Solutions')
  for (const s of solutions) {
    await upsert(payload, 'solutions', s.slug, {
      name: s.name,
      slug: s.slug,
      category: solutionCatIds.get(s.categorySlug),
      shortDescription: s.shortDescription,
      overview: richText(s.overview),
      painPoints: s.painPoints.map((item) => ({ item })),
      benefits: s.benefits.map((item) => ({ item })),
      ctas: [{ label: 'Liên hệ tư vấn', href: '/lien-he' }],
      sortOrder: s.sortOrder,
      status: 'published',
    })
  }

  // 6. Post categories
  console.log('\n📁 Post categories')
  const postCatIds = new Map<string, number>()
  for (const cat of postCategories) {
    const id = await upsert(payload, 'categories', cat.slug, {
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
    })
    postCatIds.set(cat.slug, id)
  }

  // 7. Posts
  console.log('\n📰 Posts')
  for (const post of samplePosts) {
    await upsert(payload, 'posts', post.slug, {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: postCatIds.get(post.categorySlug),
      content: richText(post.content),
      publishedAt: '2026-06-01T00:00:00.000Z',
      status: 'published',
    })
  }

  // 8. Case studies
  console.log('\n🏆 Case studies')
  for (const cs of sampleCaseStudies) {
    await upsert(payload, 'case-studies', cs.slug, {
      clientName: cs.clientName,
      slug: cs.slug,
      industry: cs.industry,
      summary: cs.summary,
      challenge: richText(cs.challenge),
      solution: richText(cs.solution),
      results: cs.results.map((item) => ({ item })),
      testimonial: cs.testimonial,
      publishedAt: '2026-06-01T00:00:00.000Z',
      status: 'published',
    })
  }

  // 9. Jobs
  console.log('\n💼 Jobs')
  for (const job of sampleJobs) {
    await upsert(payload, 'jobs', job.slug, {
      title: job.title,
      slug: job.slug,
      department: job.department,
      location: job.location,
      workType: job.workType,
      experienceLevel: job.experienceLevel,
      salaryRange: job.salaryRange,
      summary: job.summary,
      responsibilities: job.responsibilities.map((item) => ({ item })),
      requirements: job.requirements.map((item) => ({ item })),
      benefits: job.benefits.map((item) => ({ item })),
      publishedAt: '2026-06-01T00:00:00.000Z',
      status: 'published',
    })
  }

  // 10. Site settings global
  console.log('\n⚙️  Site settings')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: { brandName: 'SecureOps' },
    overrideAccess: true,
  })
  console.log('  ~ site-settings ensured')

  console.log('\n✅ Seed complete.\n')
  process.exit(0)
}

seed().catch((err) => {
  console.error('\n❌ Seed failed:', err)
  process.exit(1)
})
