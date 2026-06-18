import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { BlogCard } from '@/components/cards/BlogCard'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getPosts } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { mediaAlt, mediaUrl, formatDateVi } from '@/lib/utils'
import { vi } from '@/dictionaries/vi'

export const metadata: Metadata = buildMetadata({
  title: 'Tin tức & Blog',
  description: 'Tin tức an ninh mạng và bài viết chuyên môn từ SecureOps.',
  path: vi.routes.news,
})

export default async function NewsPage() {
  const posts = await getPosts()
  const [featuredPost, ...otherPosts] = posts
  const featuredCover = featuredPost
    ? (mediaUrl(featuredPost.coverImage, 'card') ?? '/secureops/blog-cover-default.webp')
    : null
  const featuredCategory =
    typeof featuredPost?.category === 'object' && featuredPost.category
      ? featuredPost.category.name
      : null

  return (
    <>
      <Breadcrumbs items={[{ name: vi.nav.news, href: vi.routes.news }]} />
      <section className="border-b border-border-soft bg-bg-soft/70 py-12">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Tin tức"
            title={vi.sections.newsTitle}
            subtitle="Phân tích mối đe dọa, kinh nghiệm vận hành bảo mật và góc nhìn thực tế cho doanh nghiệp."
          />
          {posts.length === 0 ? (
            <p className="mt-10 text-sm text-slate">Chưa có bài viết.</p>
          ) : featuredPost ? (
            <Link
              href={`/tin-tuc/${featuredPost.slug}`}
              className="group mt-10 grid overflow-hidden rounded-2xl border border-border-soft bg-white shadow-[0_26px_80px_-56px_rgba(8,1,45,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 lg:grid-cols-[minmax(0,1fr)_420px]"
            >
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate">
                  {featuredCategory && (
                    <span className="font-semibold text-primary">{featuredCategory}</span>
                  )}
                  {featuredPost.publishedAt && <span>· {formatDateVi(featuredPost.publishedAt)}</span>}
                </div>
                <h2 className="max-w-3xl text-2xl font-bold leading-tight text-ink transition-colors group-hover:text-primary sm:text-3xl">
                  {featuredPost.title}
                </h2>
                {featuredPost.excerpt && (
                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate">
                    {featuredPost.excerpt}
                  </p>
                )}
                <span className="mt-6 text-sm font-semibold text-primary">Đọc bài phân tích</span>
              </div>
              {featuredCover && (
                <div className="relative min-h-56 overflow-hidden bg-bg-soft lg:min-h-full">
                  <Image
                    src={featuredCover}
                    alt={mediaAlt(featuredPost.coverImage, featuredPost.title)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
              )}
            </Link>
          ) : null}
        </Container>
      </section>
      {otherPosts.length > 0 && (
        <section className="py-12">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post, i) => (
                <Reveal key={post.id} delay={i * 0.04}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
