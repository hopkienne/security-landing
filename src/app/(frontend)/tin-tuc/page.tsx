import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { BlogCard } from '@/components/cards/BlogCard'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getPosts } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { vi } from '@/dictionaries/vi'

export const metadata: Metadata = buildMetadata({
  title: 'Tin tức & Blog',
  description: 'Tin tức an ninh mạng và bài viết chuyên môn từ SecureOps.',
  path: vi.routes.news,
})

export default async function NewsPage() {
  const posts = await getPosts()
  return (
    <>
      <Breadcrumbs items={[{ name: vi.nav.news, href: vi.routes.news }]} />
      <section className="py-12">
        <Container>
          <SectionHeading as="h1" eyebrow="Tin tức" title={vi.sections.newsTitle} />
          {posts.length === 0 ? (
            <p className="mt-10 text-sm text-slate">Chưa có bài viết.</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={i * 0.04}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
