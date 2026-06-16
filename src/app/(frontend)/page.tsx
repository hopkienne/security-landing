import Link from 'next/link'
import { ArrowRight, ShieldCheck, Zap, Users, LineChart } from 'lucide-react'
import { Hero } from '@/components/sections/Hero'
import { CTASection } from '@/components/sections/CTASection'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { ProductCard } from '@/components/cards/ProductCard'
import { SolutionCard } from '@/components/cards/SolutionCard'
import { BlogCard } from '@/components/cards/BlogCard'
import { getProducts, getSolutions, getPosts } from '@/lib/queries'
import { vi } from '@/dictionaries/vi'

export default async function HomePage() {
  const [products, solutions, posts] = await Promise.all([
    getProducts(),
    getSolutions(),
    getPosts(),
  ])

  return (
    <>
      <Hero />

      <StatsBand />

      {/* Products */}
      <section className="py-16">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Sản phẩm"
              title={vi.sections.productsTitle}
              subtitle={vi.sections.productsSubtitle}
            />
            <Link
              href={vi.routes.products}
              className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-primary sm:inline-flex"
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

      {/* Solutions */}
      <section className="bg-bg-soft py-16">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Giải pháp"
              title={vi.sections.solutionsTitle}
              subtitle={vi.sections.solutionsSubtitle}
            />
            <Link
              href={vi.routes.solutions}
              className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-accent sm:inline-flex"
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
        </Container>
      </section>

      <WhyUs />

      {/* News */}
      {posts.length > 0 && (
        <section className="py-16">
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
    { value: '500+', label: 'Doanh nghiệp tin tưởng' },
    { value: '99,9%', label: 'Tỷ lệ phát hiện mối đe dọa' },
    { value: '<15ph', label: 'Thời gian phản ứng trung bình' },
  ]
  return (
    <Container>
      <div className="-mt-10 grid grid-cols-2 gap-4 rounded-[var(--radius-brand-xl)] border border-border-soft bg-white p-6 shadow-sm lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-bold text-primary">{s.value}</p>
            <p className="mt-1 text-sm text-slate">{s.label}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}

function WhyUs() {
  const items = [
    {
      icon: ShieldCheck,
      title: 'Phòng thủ thích ứng',
      desc: 'Kết hợp AI và chuyên gia để ngăn chặn tấn công trước khi gây thiệt hại.',
    },
    {
      icon: Zap,
      title: 'Phản ứng tức thời',
      desc: 'Phát hiện và xử lý sự cố trong vài phút, giảm thiểu rủi ro gián đoạn.',
    },
    {
      icon: Users,
      title: 'Chuyên gia đồng hành',
      desc: 'Đội ngũ kỹ sư bảo mật giàu kinh nghiệm hỗ trợ doanh nghiệp 24/7.',
    },
    {
      icon: LineChart,
      title: 'Minh bạch & đo lường',
      desc: 'Báo cáo rõ ràng, chỉ số an ninh trực quan giúp ra quyết định nhanh.',
    },
  ]
  return (
    <section className="bg-ink py-16 text-white">
      <Container>
        <SectionHeading
          eyebrow="Vì sao chọn SecureOps"
          title={<span className="text-white">Năng lực phòng thủ toàn diện cho doanh nghiệp</span>}
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="rounded-[var(--radius-brand-lg)] border border-white/10 bg-white/5 p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-brand)] bg-primary/20 text-primary-light">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.desc}</p>
              </div>
            </Reveal>
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
