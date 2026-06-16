import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { CaseStudyCard } from '@/components/cards/CaseStudyCard'
import { CTASection } from '@/components/sections/CTASection'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getCaseStudies } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { vi } from '@/dictionaries/vi'

export const metadata: Metadata = buildMetadata({
  title: 'Khách hàng & Dự án',
  description: 'Câu chuyện thành công và dự án tiêu biểu của SecureOps.',
  path: vi.routes.customers,
})

export default async function CaseStudiesPage() {
  const items = await getCaseStudies()
  return (
    <>
      <Breadcrumbs items={[{ name: vi.nav.customers, href: vi.routes.customers }]} />
      <section className="py-12">
        <Container>
          <SectionHeading as="h1" eyebrow="Khách hàng" title={vi.sections.customersTitle} />
          {items.length === 0 ? (
            <p className="mt-10 text-sm text-slate">Nội dung đang được cập nhật.</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.04}>
                  <CaseStudyCard item={item} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
      <CTASection />
    </>
  )
}
