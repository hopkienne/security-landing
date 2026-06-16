import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
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
    <section className="py-20">
      <Container>
        <div className="bg-hero-glow relative overflow-hidden rounded-[var(--radius-brand-xl)] px-6 py-16 text-center sm:px-12">
          <Image
            src="/secureops/cta-consulting.webp"
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 1216px"
            className="absolute inset-0 object-cover opacity-40 mix-blend-screen"
            aria-hidden
          />
          <div className="bg-dotgrid absolute inset-0 opacity-40" aria-hidden />
          <div
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan/20 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[2.6rem]">
              {title}
            </h2>
            <p className="mt-4 text-lg text-white/75">{subtitle}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href={vi.routes.contact}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-bold text-white shadow-[0_14px_34px_-10px_rgba(32,6,247,0.8)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                {CTA.primary}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={vi.routes.solutions}
                className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-all hover:border-white/50 hover:bg-white/10"
              >
                {CTA.secondarySolutions}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
