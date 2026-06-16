import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { JobCard } from '@/components/cards/JobCard'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getJobs } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { vi } from '@/dictionaries/vi'

export const metadata: Metadata = buildMetadata({
  title: 'Tuyển dụng',
  description: 'Cơ hội nghề nghiệp tại SecureOps — gia nhập đội ngũ chuyên gia an ninh mạng.',
  path: vi.routes.careers,
})

export default async function CareersPage() {
  const jobs = await getJobs()
  return (
    <>
      <Breadcrumbs items={[{ name: vi.nav.careers, href: vi.routes.careers }]} />
      <section className="py-12">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Tuyển dụng"
            title={vi.sections.careersTitle}
            subtitle="Cùng SecureOps xây dựng tương lai an toàn hơn cho doanh nghiệp Việt Nam."
          />
          {jobs.length === 0 ? (
            <p className="mt-10 text-sm text-slate">Hiện chưa có vị trí tuyển dụng.</p>
          ) : (
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {jobs.map((job, i) => (
                <Reveal key={job.id} delay={i * 0.04}>
                  <JobCard job={job} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
