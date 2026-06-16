import type { Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { ProductCard } from '@/components/cards/ProductCard'
import { CTASection } from '@/components/sections/CTASection'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getProducts, getProductCategories } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { vi } from '@/dictionaries/vi'

export const metadata: Metadata = buildMetadata({
  title: 'Sản phẩm bảo mật',
  description: 'Danh mục sản phẩm an ninh mạng của SecureOps cho doanh nghiệp.',
  path: vi.routes.products,
})

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getProductCategories()])

  return (
    <>
      <Breadcrumbs items={[{ name: vi.nav.products, href: vi.routes.products }]} />
      <section className="py-12">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Sản phẩm"
            title={vi.sections.productsTitle}
            subtitle={vi.sections.productsSubtitle}
          />
          <div className="relative mt-8 aspect-[12/5] overflow-hidden rounded-[var(--radius-brand-xl)] border border-border-soft">
            <Image
              src="/secureops/products-security-platform.webp"
              alt="Các module sản phẩm kết nối tới một hub bảo mật trung tâm"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1216px"
              className="object-cover"
            />
          </div>
          {categories.length > 0 ? (
            categories.map((cat) => {
              const items = products.filter(
                (p) => (typeof p.category === 'object' ? p.category?.id : p.category) === cat.id,
              )
              if (items.length === 0) return null
              return (
                <div key={cat.id} className="mt-12">
                  <h2 className="mb-5 text-xl font-semibold text-ink">{cat.name}</h2>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((p, i) => (
                      <Reveal key={p.id} delay={i * 0.04}>
                        <ProductCard product={p} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.04}>
                  <ProductCard product={p} />
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
