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
} from './data/catalog-vi'

/**
 * Nạp danh mục sản phẩm & giải pháp (đã làm sạch + dịch tiếng Việt) vào Payload.
 *
 * Nguồn dữ liệu: src/data/catalog-vi.ts (biên dịch từ data/sophos_crawl).
 * Idempotent: upsert theo slug. Mặc định bỏ qua bản ghi đã tồn tại để không ghi đè
 * chỉnh sửa của admin; chạy với --force để ghi đè.
 *
 *   pnpm tsx src/migrate-catalog.ts            # tạo mới, bỏ qua nếu đã có
 *   pnpm tsx src/migrate-catalog.ts --force    # ghi đè dữ liệu cũ
 */

const FORCE = process.argv.includes('--force')

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
      console.log(`  ~ cập nhật ${collection}/${slug}`)
    } else {
      console.log(`  = bỏ qua ${collection}/${slug} (đã tồn tại)`)
    }
    return id
  }

  const created = await payload.create({ collection, data, overrideAccess: true })
  console.log(`  + tạo mới ${collection}/${slug}`)
  return created.id as number
}

async function migrate() {
  const payload = await getPayload({ config })
  console.log(`\n📦 Nạp danh mục sản phẩm & giải pháp${FORCE ? ' (--force)' : ''}...\n`)

  // 1. Danh mục sản phẩm
  console.log('📁 Danh mục sản phẩm')
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

  // 2. Sản phẩm
  console.log('\n🛡️  Sản phẩm')
  for (const p of products) {
    const categoryId = productCatIds.get(p.categorySlug)
    if (!categoryId) {
      console.warn(`  ! Bỏ qua sản phẩm "${p.slug}": không tìm thấy danh mục "${p.categorySlug}"`)
      continue
    }
    await upsert(payload, 'products', p.slug, {
      name: p.name,
      slug: p.slug,
      category: categoryId,
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

  // 3. Nhóm giải pháp
  console.log('\n📁 Nhóm giải pháp')
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

  // 4. Giải pháp
  console.log('\n🎯 Giải pháp')
  for (const s of solutions) {
    const categoryId = solutionCatIds.get(s.categorySlug)
    if (!categoryId) {
      console.warn(`  ! Bỏ qua giải pháp "${s.slug}": không tìm thấy nhóm "${s.categorySlug}"`)
      continue
    }
    await upsert(payload, 'solutions', s.slug, {
      name: s.name,
      slug: s.slug,
      category: categoryId,
      shortDescription: s.shortDescription,
      overview: richText(s.overview),
      painPoints: s.painPoints.map((item) => ({ item })),
      benefits: s.benefits.map((item) => ({ item })),
      ctas: [{ label: 'Liên hệ tư vấn', href: '/lien-he' }],
      sortOrder: s.sortOrder,
      status: 'published',
    })
  }

  // Tổng kết
  const [pc, pr, sc, so] = await Promise.all([
    payload.count({ collection: 'product-categories', overrideAccess: true }),
    payload.count({ collection: 'products', overrideAccess: true }),
    payload.count({ collection: 'solution-categories', overrideAccess: true }),
    payload.count({ collection: 'solutions', overrideAccess: true }),
  ])
  console.log('\n✅ Hoàn tất. Tổng số bản ghi trong DB:')
  console.log(`   - Danh mục sản phẩm: ${pc.totalDocs}`)
  console.log(`   - Sản phẩm:          ${pr.totalDocs}`)
  console.log(`   - Nhóm giải pháp:    ${sc.totalDocs}`)
  console.log(`   - Giải pháp:         ${so.totalDocs}\n`)
  process.exit(0)
}

migrate().catch((err) => {
  console.error('\n❌ Nạp dữ liệu thất bại:', err)
  process.exit(1)
})
