import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Hero } from '@/components/sections/Hero'
import { LogoMarquee } from '@/components/sections/LogoMarquee'
import { ValueProps } from '@/components/sections/ValueProps'
import { FocusSection } from '@/components/sections/FocusSection'
import { FeatureBlock } from '@/components/sections/FeatureBlock'
import { TestimonialCarousel } from '@/components/sections/TestimonialCarousel'
import { CTASection } from '@/components/sections/CTASection'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { ProductCard } from '@/components/cards/ProductCard'
import { SolutionCard } from '@/components/cards/SolutionCard'
import { BlogCard } from '@/components/cards/BlogCard'
import { getProducts, getSolutions, getPosts } from '@/lib/queries'
import { vi } from '@/dictionaries/vi'

const USE_CASES = [
  'Chống mã độc tống tiền',
  'Bảo vệ điểm cuối',
  'An ninh đám mây',
  'Bảo vệ email',
  'Zero Trust',
  'Tuân thủ & kiểm toán',
  'Ứng cứu sự cố',
  'Quản lý rủi ro',
]

export default async function HomePage() {
  const [products, solutions, posts] = await Promise.all([
    getProducts(),
    getSolutions(),
    getPosts(),
  ])

  return (
    <>
      <Hero />

      <LogoMarquee />

      <ValueProps />

      <StatsBand />

      <FocusSection />

      {/* Products */}
      <section className="py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Sản phẩm"
              title={vi.sections.productsTitle}
              subtitle={vi.sections.productsSubtitle}
            />
            <Link
              href={vi.routes.products}
              className="hidden shrink-0 items-center gap-1 text-sm font-bold text-primary sm:inline-flex"
            >
              {vi.cta.viewAll} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          {products.length === 0 && <EmptyHint />}
        </Container>
      </section>

      <FeatureBlock />

      {/* Solutions */}
      <section className="bg-bg-soft py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Giải pháp"
              title={vi.sections.solutionsTitle}
              subtitle={vi.sections.solutionsSubtitle}
            />
            <Link
              href={vi.routes.solutions}
              className="hidden shrink-0 items-center gap-1 text-sm font-bold text-primary sm:inline-flex"
            >
              {vi.cta.viewAll} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.slice(0, 6).map((s, i) => (
              <Reveal key={s.id} delay={i * 0.05}>
                <SolutionCard solution={s} />
              </Reveal>
            ))}
          </div>
          {solutions.length === 0 && <EmptyHint />}

          {/* Use-case pills */}
          <div className="mt-12">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-slate">
              Trường hợp sử dụng phổ biến
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {USE_CASES.map((uc) => (
                <Link
                  key={uc}
                  href={vi.routes.solutions}
                  className="rounded-full border border-border-soft bg-white px-4 py-2 text-sm font-medium text-ink transition-all hover:border-primary hover:bg-primary hover:text-white"
                >
                  {uc}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <TestimonialCarousel />

      {/* News */}
      {posts.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionHeading eyebrow="Tin tức" title={vi.sections.newsTitle} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(0, 3).map((post, i) => (
                <Reveal key={post.id} delay={i * 0.05}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  )
}

function StatsBand() {
  const stats = [
    { value: '24/7', label: 'Giám sát & phản ứng sự cố' },
    { value: '52%', label: 'Sự cố được AI xử lý tự động' },
    { value: '99,9%', label: 'Tỷ lệ phát hiện mối đe dọa' },
    { value: '<15ph', label: 'Thời gian phản ứng trung bình' },
  ]
  return (
    <section className="pb-4">
      <Container>
        <div className="grid grid-cols-2 gap-4 rounded-[var(--radius-brand-xl)] border border-border-soft bg-white p-8 shadow-[0_20px_50px_-30px_rgba(10,27,61,0.3)] lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-extrabold tracking-tight text-primary">{s.value}</p>
              <p className="mt-2 text-sm text-slate">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function EmptyHint() {
  return (
    <p className="mt-8 rounded-[var(--radius-brand-lg)] border border-dashed border-border-soft bg-bg-soft p-8 text-center text-sm text-slate">
      Nội dung đang được cập nhật. Chạy <code className="text-primary">pnpm seed</code> để nạp dữ
      liệu mẫu.
    </p>
  )
}
