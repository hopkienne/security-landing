import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Check, MapPin, Briefcase, Clock } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SEOJsonLd } from '@/components/SEOJsonLd'
import { JobApplicationForm } from '@/components/forms/JobApplicationForm'
import { getJobBySlug, getJobs } from '@/lib/queries'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { jobPostingJsonLd, breadcrumbJsonLd } from '@/lib/jsonld'
import { vi } from '@/dictionaries/vi'

const WORK_TYPE_LABEL: Record<string, string> = {
  'full-time': 'Toàn thời gian',
  'part-time': 'Bán thời gian',
  contract: 'Hợp đồng',
  remote: 'Từ xa',
  hybrid: 'Hybrid',
}

export async function generateStaticParams() {
  const jobs = await getJobs()
  return jobs.map((j) => ({ slug: j.slug ?? '' })).filter((j) => j.slug)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const job = await getJobBySlug(slug)
  if (!job) return buildMetadata({ title: 'Không tìm thấy' })
  return buildMetadata({
    title: job.seo?.metaTitle || job.title,
    description: job.seo?.metaDescription || job.summary,
    path: `/tuyen-dung/${slug}`,
    canonical: job.seo?.canonical,
  })
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = await getJobBySlug(slug)
  if (!job) notFound()

  const url = `${SITE_URL}/tuyen-dung/${slug}`

  return (
    <>
      <SEOJsonLd
        data={[
          jobPostingJsonLd({
            title: job.title,
            description: job.summary,
            datePosted: job.publishedAt,
            employmentType: job.workType,
            location: job.location,
          }),
          breadcrumbJsonLd([
            { name: 'Trang chủ', url: SITE_URL },
            { name: vi.nav.careers, url: `${SITE_URL}${vi.routes.careers}` },
            { name: job.title, url },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: vi.nav.careers, href: vi.routes.careers },
          { name: job.title, href: `/tuyen-dung/${slug}` },
        ]}
      />

      <section className="border-b border-border-soft bg-bg-soft py-14">
        <Container>
          <h1 className="text-4xl font-bold tracking-tight text-ink">{job.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate">
            {job.department && (
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" /> {job.department}
              </span>
            )}
            {job.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {job.location}
              </span>
            )}
            {job.workType && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {WORK_TYPE_LABEL[job.workType] ?? job.workType}
              </span>
            )}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {job.summary && <p className="text-lg leading-relaxed text-slate">{job.summary}</p>}
            <BulletBlock title="Trách nhiệm" items={job.responsibilities?.map((r) => r.item)} />
            <BulletBlock title="Yêu cầu" items={job.requirements?.map((r) => r.item)} />
            <BulletBlock title="Quyền lợi" items={job.benefits?.map((b) => b.item)} />
          </div>

          <aside>
            <div className="sticky top-24 rounded-[var(--radius-brand-lg)] border border-border-soft bg-white p-6">
              <h2 className="text-lg font-semibold text-ink">Ứng tuyển ngay</h2>
              <p className="mt-1 mb-4 text-sm text-slate">
                Điền thông tin bên dưới, đội ngũ tuyển dụng sẽ liên hệ với bạn.
              </p>
              <JobApplicationForm jobId={job.id} jobTitle={job.title} />
            </div>
          </aside>
        </Container>
      </section>
    </>
  )
}

function BulletBlock({ title, items }: { title: string; items?: (string | undefined)[] }) {
  const list = (items ?? []).filter(Boolean) as string[]
  if (list.length === 0) return null
  return (
    <div>
      <h2 className="mb-3 text-xl font-bold text-ink">{title}</h2>
      <ul className="space-y-2">
        {list.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
