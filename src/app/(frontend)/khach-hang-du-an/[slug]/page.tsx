import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Check, Quote } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { RichText } from '@/components/RichText'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CTASection } from '@/components/sections/CTASection'
import { SEOJsonLd } from '@/components/SEOJsonLd'
import { getCaseStudyBySlug, getCaseStudies } from '@/lib/queries'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { breadcrumbJsonLd } from '@/lib/jsonld'
import { mediaUrl, mediaAlt } from '@/lib/utils'
import { vi } from '@/dictionaries/vi'

export async function generateStaticParams() {
  const items = await getCaseStudies()
  return items.map((c) => ({ slug: c.slug ?? '' })).filter((c) => c.slug)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = await getCaseStudyBySlug(slug)
  if (!item) return buildMetadata({ title: 'Không tìm thấy' })
  return buildMetadata({
    title: item.seo?.metaTitle || item.clientName,
    description: item.seo?.metaDescription || item.summary,
    path: `/khach-hang-du-an/${slug}`,
    image: mediaUrl(item.seo?.ogImage, 'og') || mediaUrl(item.coverImage, 'og'),
    canonical: item.seo?.canonical,
  })
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = await getCaseStudyBySlug(slug)
  if (!item) notFound()

  const url = `${SITE_URL}/khach-hang-du-an/${slug}`
  const cover = mediaUrl(item.coverImage, 'og')

  return (
    <>
      <SEOJsonLd
        data={breadcrumbJsonLd([
          { name: 'Trang chủ', url: SITE_URL },
          { name: vi.nav.customers, url: `${SITE_URL}${vi.routes.customers}` },
          { name: item.clientName, url },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: vi.nav.customers, href: vi.routes.customers },
          { name: item.clientName, href: `/khach-hang-du-an/${slug}` },
        ]}
      />

      <section className="border-b border-border-soft bg-bg-soft py-14">
        <Container>
          {item.industry && (
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">
              {item.industry}
            </span>
          )}
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink">{item.clientName}</h1>
          {item.summary && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate">{item.summary}</p>
          )}
        </Container>
      </section>

      {cover && (
        <Container className="py-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-brand-xl)]">
            <Image
              src={cover}
              alt={mediaAlt(item.coverImage, item.clientName)}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        </Container>
      )}

      <section className="py-6">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {item.challenge && (
              <div>
                <h2 className="mb-2 text-2xl font-bold text-ink">Thách thức</h2>
                <RichText data={item.challenge} />
              </div>
            )}
            {item.solution && (
              <div>
                <h2 className="mb-2 text-2xl font-bold text-ink">Giải pháp</h2>
                <RichText data={item.solution} />
              </div>
            )}
          </div>
          <aside className="space-y-6">
            {item.results && item.results.length > 0 && (
              <div className="rounded-[var(--radius-brand-lg)] border border-border-soft bg-white p-6">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                  Kết quả
                </h3>
                <ul className="space-y-2">
                  {item.results.map((r) => (
                    <li key={r.id} className="flex items-start gap-2 text-sm text-slate">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {r.item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {item.testimonial?.quote && (
              <figure className="rounded-[var(--radius-brand-lg)] bg-ink p-6 text-white">
                <Quote className="h-6 w-6 text-primary-light" />
                <blockquote className="mt-3 text-sm leading-relaxed text-white/90">
                  {item.testimonial.quote}
                </blockquote>
                {item.testimonial.author && (
                  <figcaption className="mt-3 text-sm font-semibold">
                    {item.testimonial.author}
                    {item.testimonial.role && (
                      <span className="font-normal text-white/60"> · {item.testimonial.role}</span>
                    )}
                  </figcaption>
                )}
              </figure>
            )}
          </aside>
        </Container>
      </section>

      <CTASection />
    </>
  )
}
