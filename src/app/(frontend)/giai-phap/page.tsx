import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { SolutionCard } from '@/components/cards/SolutionCard'
import { CTASection } from '@/components/sections/CTASection'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getSolutions, getSolutionCategories } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { vi } from '@/dictionaries/vi'

export const metadata: Metadata = buildMetadata({
  title: 'Giải pháp an ninh mạng',
  description: 'Giải pháp bảo mật theo nhu cầu, ngành và yêu cầu tuân thủ từ SecureOps.',
  path: vi.routes.solutions,
})

const TYPE_LABEL: Record<string, string> = {
  use_case: 'Theo nhu cầu',
  industry: 'Theo ngành',
  compliance: 'Tuân thủ',
  general: 'Tổng quát',
}

export default async function SolutionsPage() {
  const [solutions, categories] = await Promise.all([getSolutions(), getSolutionCategories()])
  const types = ['use_case', 'industry', 'compliance', 'general']

  return (
    <>
      <Breadcrumbs items={[{ name: vi.nav.solutions, href: vi.routes.solutions }]} />
      <section className="py-12">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Giải pháp"
            title={vi.sections.solutionsTitle}
            subtitle={vi.sections.solutionsSubtitle}
          />
          {types.map((type) => {
            const catIds = categories.filter((c) => c.type === type).map((c) => c.id)
            const items = solutions.filter((s) => {
              const cid = typeof s.category === 'object' ? s.category?.id : s.category
              return cid != null && catIds.includes(cid)
            })
            if (items.length === 0) return null
            return (
              <div key={type} className="mt-12">
                <h2 className="mb-5 text-xl font-semibold text-ink">{TYPE_LABEL[type]}</h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((s, i) => (
                    <Reveal key={s.id} delay={i * 0.04}>
                      <SolutionCard solution={s} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )
          })}
          {solutions.length === 0 && (
            <p className="mt-10 text-sm text-slate">Nội dung đang được cập nhật.</p>
          )}
        </Container>
      </section>
      <CTASection />
    </>
  )
}
