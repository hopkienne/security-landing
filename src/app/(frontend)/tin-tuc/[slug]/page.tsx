import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
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
      <article className="py-12">
        <Container className="max-w-3xl">
          <div className="mb-3 flex items-center gap-2 text-sm text-slate">
            {category && <span className="font-semibold text-primary">{category}</span>}
            {post.publishedAt && <span>· {formatDateVi(post.publishedAt)}</span>}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-ink">{post.title}</h1>
          {post.excerpt && <p className="mt-4 text-lg leading-relaxed text-slate">{post.excerpt}</p>}
          {cover && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[var(--radius-brand-lg)]">
              <Image
                src={cover}
                alt={mediaAlt(post.coverImage, post.title)}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}
          {post.content && <RichText data={post.content} className="mt-8" />}
        </Container>
      </article>
      <CTASection />
    </>
  )
}
