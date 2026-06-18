import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { BookOpen, CalendarDays, Clock3, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { RichText } from '@/components/RichText'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CTASection } from '@/components/sections/CTASection'
import { SEOJsonLd } from '@/components/SEOJsonLd'
import { getPostBySlug, getPosts } from '@/lib/queries'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/jsonld'
import { mediaUrl, mediaAlt, formatDateVi } from '@/lib/utils'
import { vi } from '@/dictionaries/vi'

type LexicalTextNode = { text?: unknown; children?: LexicalTextNode[] }

function collectText(node: LexicalTextNode): string {
  if (typeof node.text === 'string') return node.text
  if (Array.isArray(node.children)) return node.children.map(collectText).join(' ')
  return ''
}

function getRichTextWordCount(content: unknown): number {
  if (!content || typeof content !== 'object') return 0
  const root = (content as { root?: { children?: LexicalTextNode[] } }).root
  const text = root?.children?.map(collectText).join(' ') ?? ''
  return text.trim().split(/\s+/).filter(Boolean).length
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((p) => ({ slug: p.slug ?? '' })).filter((p) => p.slug)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return buildMetadata({ title: 'Không tìm thấy' })
  return buildMetadata({
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    path: `/tin-tuc/${slug}`,
    image: mediaUrl(post.seo?.ogImage, 'og') || mediaUrl(post.coverImage, 'og'),
    canonical: post.seo?.canonical,
    type: 'article',
  })
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const url = `${SITE_URL}/tin-tuc/${slug}`
  const cover = mediaUrl(post.coverImage, 'og') ?? '/secureops/blog-cover-default.webp'
  const category = typeof post.category === 'object' && post.category ? post.category.name : null
  const wordCount = getRichTextWordCount(post.content)
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 220))

  return (
    <>
      <SEOJsonLd
        data={[
          articleJsonLd({
            title: post.title,
            description: post.excerpt,
            url,
            image: cover,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            wordCount,
          }),
          breadcrumbJsonLd([
            { name: 'Trang chủ', url: SITE_URL },
            { name: vi.nav.news, url: `${SITE_URL}${vi.routes.news}` },
            { name: post.title, url },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: vi.nav.news, href: vi.routes.news },
          { name: post.title, href: `/tin-tuc/${slug}` },
        ]}
      />
      <article>
        <header className="border-b border-border-soft bg-bg-soft/80 py-10 sm:py-12">
          <Container className="grid max-w-6xl items-end gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-slate">
                {category && (
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                    {category}
                  </span>
                )}
                {post.publishedAt && (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" />
                    {formatDateVi(post.publishedAt)}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" />
                  {readingMinutes} phút đọc
                </span>
              </div>
              <h1 className="max-w-4xl text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate sm:text-xl">
                  {post.excerpt}
                </p>
              )}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  SecureOps Research
                </span>
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Bài viết chuyên sâu
                </span>
              </div>
            </div>
            {cover && (
              <div className="relative h-48 overflow-hidden rounded-xl border border-white/70 bg-white shadow-[0_24px_70px_-45px_rgba(8,1,45,0.45)] sm:h-56 lg:h-64">
                <Image
                  src={cover}
                  alt={mediaAlt(post.coverImage, post.title)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 340px"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </Container>
        </header>
        <Container className="max-w-6xl py-10 sm:py-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,72ch)_260px] lg:items-start">
            {post.content && <RichText data={post.content} className="article-prose" />}
            <aside className="hidden lg:block">
              <div className="sticky top-28 border-l border-border-soft pl-6 text-sm">
                <p className="font-semibold text-ink">Thông tin bài viết</p>
                <dl className="mt-4 space-y-4 text-slate">
                  {category && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate/70">
                        Chuyên mục
                      </dt>
                      <dd className="mt-1 text-ink">{category}</dd>
                    </div>
                  )}
                  {post.publishedAt && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate/70">
                        Ngày đăng
                      </dt>
                      <dd className="mt-1 text-ink">{formatDateVi(post.publishedAt)}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate/70">
                      Thời lượng
                    </dt>
                    <dd className="mt-1 text-ink">{readingMinutes} phút đọc</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate/70">
                      Nguồn
                    </dt>
                    <dd className="mt-1 text-ink">SecureOps Research</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </article>
      <CTASection />
    </>
  )
}
