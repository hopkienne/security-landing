import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { RichText } from '@/components/RichText'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/cards/ProductCard'
import { SolutionCard } from '@/components/cards/SolutionCard'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CTASection } from '@/components/sections/CTASection'
import { SEOJsonLd } from '@/components/SEOJsonLd'
import { getProductBySlug, getProducts } from '@/lib/queries'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { serviceJsonLd, breadcrumbJsonLd } from '@/lib/jsonld'
import { mediaUrl } from '@/lib/utils'
import { vi } from '@/dictionaries/vi'
import type { Product, Solution } from '@/payload-types'

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((p) => ({ slug: p.slug ?? '' })).filter((p) => p.slug)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return buildMetadata({ title: 'Không tìm thấy' })
  return buildMetadata({
    title: product.seo?.metaTitle || product.name,
    description: product.seo?.metaDescription || product.shortDescription,
    path: `/san-pham/${slug}`,
    image: mediaUrl(product.seo?.ogImage, 'og') || mediaUrl(product.image, 'og'),
    canonical: product.seo?.canonical,
  })
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const url = `${SITE_URL}/san-pham/${slug}`
  const relatedProducts = (product.relatedProducts ?? []).filter(
    (p): p is Product => typeof p === 'object',
  )
  const relatedSolutions = (product.relatedSolutions ?? []).filter(
    (s): s is Solution => typeof s === 'object',
  )

  return (
    <>
      <SEOJsonLd
        data={[
          serviceJsonLd({ name: product.name, description: product.shortDescription, url }),
          breadcrumbJsonLd([
            { name: 'Trang chủ', url: SITE_URL },
            { name: vi.nav.products, url: `${SITE_URL}${vi.routes.products}` },
            { name: product.name, url },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: vi.nav.products, href: vi.routes.products },
          { name: product.name, href: `/san-pham/${slug}` },
        ]}
      />

      <section className="border-b border-border-soft bg-bg-soft py-14">
        <Container className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-ink">{product.name}</h1>
            {product.shortDescription && (
              <p className="mt-4 text-lg leading-relaxed text-slate">{product.shortDescription}</p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={vi.routes.contact}>{vi.cta.primary}</Button>
              {(product.ctas ?? []).slice(0, 1).map((cta) => (
                <Button key={cta.id} href={cta.href} variant="secondary">
                  {cta.label}
                </Button>
              ))}
            </div>
          </div>
          {product.keyPoints && product.keyPoints.length > 0 && (
            <div className="rounded-[var(--radius-brand-xl)] border border-border-soft bg-white p-6">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
                Điểm nổi bật
              </p>
              <ul className="space-y-3">
                {product.keyPoints.map((kp) => (
                  <li key={kp.id} className="flex items-start gap-2 text-sm text-slate">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {kp.item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>

      <section className="py-14">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {product.overview && <RichText data={product.overview} />}
            <FeatureBenefit
              features={product.features?.map((f) => f.item) ?? []}
              benefits={product.benefits?.map((b) => b.item) ?? []}
            />
          </div>
          <aside className="space-y-6">
            {relatedSolutions.length > 0 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate">
                  Giải pháp liên quan
                </h3>
                <div className="space-y-3">
                  {relatedSolutions.slice(0, 3).map((s) => (
                    <SolutionCard key={s.id} solution={s} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </Container>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-bg-soft py-14">
          <Container>
            <h2 className="mb-8 text-2xl font-bold text-ink">Sản phẩm liên quan</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.slice(0, 3).map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05}>
                  <ProductCard product={p} />
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

function FeatureBenefit({ features, benefits }: { features: string[]; benefits: string[] }) {
  if (features.length === 0 && benefits.length === 0) return null
  return (
    <div className="mt-10 grid gap-8 sm:grid-cols-2">
      {features.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-ink">Tính năng</h3>
          <ul className="space-y-2">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
              </li>
            ))}
          </ul>
        </div>
      )}
      {benefits.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-ink">Lợi ích</h3>
          <ul className="space-y-2">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
