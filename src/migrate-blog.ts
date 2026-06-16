import 'dotenv/config'
import { getPayload } from 'payload'
import type { Payload } from 'payload'
import config from './payload.config'
import { richText } from './lib/lexical'
import { postCategories, posts } from './data/blog-vi'

/**
 * Nạp chuyên mục & bài blog tiếng Việt vào Payload.
 *
 * Nguồn dữ liệu: src/data/blog-vi.ts (biên soạn gốc, chủ đề an ninh mạng).
 * Idempotent: upsert theo slug. Mặc định bỏ qua bản ghi đã tồn tại; chạy với
 * --force để ghi đè.
 *
 *   pnpm tsx src/migrate-blog.ts            # tạo mới, bỏ qua nếu đã có
 *   pnpm tsx src/migrate-blog.ts --force    # ghi đè dữ liệu cũ
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
  console.log(`\n📰 Nạp chuyên mục & bài blog${FORCE ? ' (--force)' : ''}...\n`)

  // 1. Chuyên mục
  console.log('📁 Chuyên mục')
  const catIds = new Map<string, number>()
  for (const cat of postCategories) {
    const id = await upsert(payload, 'categories', cat.slug, {
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
    })
    catIds.set(cat.slug, id)
  }

  // 2. Bài viết
  console.log('\n✍️  Bài viết')
  for (const post of posts) {
    const categoryId = catIds.get(post.categorySlug)
    if (!categoryId) {
      console.warn(`  ! Bỏ qua bài "${post.slug}": không tìm thấy chuyên mục "${post.categorySlug}"`)
      continue
    }
    await upsert(payload, 'posts', post.slug, {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: categoryId,
      content: richText(post.content),
      publishedAt: post.publishedAt,
      status: 'published',
    })
  }

  // Tổng kết
  const [cat, po] = await Promise.all([
    payload.count({ collection: 'categories', overrideAccess: true }),
    payload.count({ collection: 'posts', overrideAccess: true }),
  ])
  console.log('\n✅ Hoàn tất. Tổng số bản ghi trong DB:')
  console.log(`   - Chuyên mục: ${cat.totalDocs}`)
  console.log(`   - Bài viết:   ${po.totalDocs}\n`)
  process.exit(0)
}

migrate().catch((err) => {
  console.error('\n❌ Nạp dữ liệu thất bại:', err)
  process.exit(1)
})
