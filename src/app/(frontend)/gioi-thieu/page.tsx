import type { Metadata } from 'next'
import { ShieldCheck, Target, Users, Globe } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CTASection } from '@/components/sections/CTASection'
import { buildMetadata } from '@/lib/seo'
import { BRAND } from '@/brand/tokens'
import { vi } from '@/dictionaries/vi'

export const metadata: Metadata = buildMetadata({
  title: 'Giới thiệu',
  description: `Giới thiệu về ${BRAND.name} — ${BRAND.tagline}.`,
  path: vi.routes.about,
})

const values = [
  { icon: ShieldCheck, title: 'Tin cậy', desc: 'Bảo vệ dữ liệu và uy tín của khách hàng là ưu tiên cao nhất.' },
  { icon: Target, title: 'Hiệu quả', desc: 'Tập trung vào kết quả an ninh thực tế, đo lường được.' },
  { icon: Users, title: 'Đồng hành', desc: 'Xem doanh nghiệp khách hàng như chính tổ chức của mình.' },
  { icon: Globe, title: 'Cập nhật', desc: 'Luôn đi trước mối đe dọa với tri thức và công nghệ mới nhất.' },
]

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: vi.nav.about, href: vi.routes.about }]} />
      <section className="py-12">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Về chúng tôi"
            title={`${BRAND.name} — đối tác an ninh mạng của doanh nghiệp`}
            subtitle={BRAND.positioning}
          />
          <div className="mt-10 max-w-3xl space-y-4 text-base leading-relaxed text-slate">
            <p>
              {BRAND.name} là đơn vị tư vấn và triển khai giải pháp an ninh mạng, đồng hành cùng
              doanh nghiệp trong việc xây dựng năng lực phòng thủ chủ động. Chúng tôi kết hợp công
              nghệ hiện đại, quy trình chuẩn quốc tế và đội ngũ chuyên gia giàu kinh nghiệm để bảo
              vệ hệ thống, dữ liệu và hoạt động kinh doanh của khách hàng.
            </p>
            <p>
              Từ đánh giá rủi ro, triển khai giải pháp đến giám sát và phản ứng sự cố 24/7, chúng
              tôi cung cấp dịch vụ toàn diện, minh bạch và đo lường được — giúp doanh nghiệp an tâm
              tập trung vào tăng trưởng.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="rounded-[var(--radius-brand-lg)] border border-border-soft bg-white p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-brand)] bg-primary/10 text-primary">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  )
}
