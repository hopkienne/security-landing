import type { Metadata } from 'next'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ContactForm } from '@/components/forms/ContactForm'
import { buildMetadata } from '@/lib/seo'
import { BRAND } from '@/brand/tokens'
import { vi } from '@/dictionaries/vi'

export const metadata: Metadata = buildMetadata({
  title: 'Liên hệ tư vấn',
  description: 'Liên hệ với SecureOps để được tư vấn giải pháp an ninh mạng phù hợp.',
  path: vi.routes.contact,
})

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: vi.nav.contact, href: vi.routes.contact }]} />
      <section className="py-12">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              as="h1"
              eyebrow="Liên hệ"
              title="Đăng ký tư vấn bảo mật"
              subtitle="Để lại thông tin, chuyên gia SecureOps sẽ liên hệ và tư vấn lộ trình bảo mật phù hợp với doanh nghiệp của bạn."
            />
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-brand)] bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="text-slate">{BRAND.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-brand)] bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="text-slate">{BRAND.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-brand)] bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="text-slate">{BRAND.address}</span>
              </li>
            </ul>
          </div>
          <div className="rounded-[var(--radius-brand-xl)] border border-border-soft bg-white p-6 sm:p-8">
            <ContactForm sourcePage={vi.routes.contact} />
          </div>
        </Container>
      </section>
    </>
  )
}
