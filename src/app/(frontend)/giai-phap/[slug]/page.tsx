import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Check, AlertTriangle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/RichText'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/cards/ProductCard'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CTASection } from '@/components/sections/CTASection'
import { SEOJsonLd } from '@/components/SEOJsonLd'
import { getSolutionBySlug, getSolutions } from '@/lib/queries'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { serviceJsonLd, breadcrumbJsonLd } from '@/lib/jsonld'
import { mediaUrl } from '@/lib/utils'
import { vi } from '@/dictionaries/vi'
import type { Product, Solution } from '@/payload-types'

export async function generateStaticParams() {
  const solutions = await getSolutions()
  return solutions.map((s) => ({ slug: s.slug ?? '' })).filter((s) => s.slug)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const solution = await getSolutionBySlug(slug)
  if (!solution) return buildMetadata({ title: 'Không tìm thấy' })
  return buildMetadata({
    title: solution.seo?.metaTitle || solution.name,
    description: solution.seo?.metaDescription || solution.shortDescription,
    path: `/giai-phap/${slug}`,
    image: mediaUrl(solution.seo?.ogImage, 'og') || mediaUrl(solution.image, 'og'),
    canonical: solution.seo?.canonical,
  })
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const solution = await getSolutionBySlug(slug)
  if (!solution) notFound()

  const url = `${SITE_URL}/giai-phap/${slug}`
  const recommended = (solution.recommendedProducts ?? []).filter(
    (p): p is Product => typeof p === 'object',
  )

  return (
    <>
      <SEOJsonLd
        data={[
          serviceJsonLd({ name: solution.name, description: solution.shortDescription, url }),
          breadcrumbJsonLd([
            { name: 'Trang chủ', url: SITE_URL },
            { name: vi.nav.solutions, url: `${SITE_URL}${vi.routes.solutions}` },
            { name: solution.name, url },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: vi.nav.solutions, href: vi.routes.solutions },
          { name: solution.name, href: `/giai-phap/${slug}` },
        ]}
      />

      <section className="border-b border-border-soft bg-bg-soft py-14">
        <Container>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-ink">{solution.name}</h1>
          {solution.shortDescription && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate">
              {solution.shortDescription}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={vi.routes.contact}>{vi.cta.primary}</Button>
            <Button href={vi.routes.products} variant="secondary">
              {vi.cta.products}
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {solution.overview && <RichText data={solution.overview} />}

            {solution.painPoints && solution.painPoints.length > 0 && (
              <div className="mt-10">
                <h3 className="mb-3 text-lg font-semibold text-ink">Thách thức</h3>
                <ul className="space-y-2">
                  {solution.painPoints.map((p) => (
                    <li key={p.id} className="flex items-start gap-2 text-sm text-slate">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" /> {p.item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {solution.benefits && solution.benefits.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-3 text-lg font-semibold text-ink">Lợi ích</h3>
                <ul className="space-y-2">
                  {solution.benefits.map((b) => (
                    <li key={b.id} className="flex items-start gap-2 text-sm text-slate">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b.item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <DetailSections sections={solution.detailSections ?? []} />
          </div>

          <aside>
            {recommended.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate">
                  Sản phẩm đề xuất
                </h3>
                <div className="space-y-3">
                  {recommended.slice(0, 3).map((p, i) => (
                    <Reveal key={p.id} delay={i * 0.05}>
                      <ProductCard product={p} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </Container>
      </section>

      <CTASection />
    </>
  )
}

function DetailSections({
  sections,
}: {
  sections: NonNullable<Solution['detailSections']>
}) {
  if (sections.length === 0) return null

  return (
    <div className="mt-12 space-y-10 border-t border-border-soft pt-10">
      {sections.map((section) => (
        <section key={section.id ?? section.heading} className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">{section.heading}</h2>
          <RichText data={section.body} />
          {section.bullets && section.bullets.length > 0 && (
            <ul className="grid gap-3 sm:grid-cols-2">
              {section.bullets.map((bullet) => (
                <li key={bullet.id ?? bullet.item} className="flex items-start gap-2 text-sm text-slate">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{bullet.item}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}
