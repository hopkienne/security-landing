import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { CTA } from '@/brand/tokens'
import { vi } from '@/dictionaries/vi'

export function CTASection({
  title = 'Sẵn sàng nâng cao năng lực phòng thủ an ninh mạng?',
  subtitle = 'Đặt lịch trao đổi với chuyên gia SecureOps để được tư vấn lộ trình bảo mật phù hợp với doanh nghiệp của bạn.',
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <section className="py-16">
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-brand-xl)] bg-gradient-to-br from-primary via-primary-dark to-accent px-6 py-14 text-center sm:px-12">
          <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-lg text-white/85">{subtitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={vi.routes.contact} variant="secondary" size="lg">
                {CTA.primary}
              </Button>
              <Button
                href={vi.routes.solutions}
                size="lg"
                className="bg-transparent text-white border border-white/40 hover:bg-white/10"
              >
                {CTA.secondarySolutions}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
