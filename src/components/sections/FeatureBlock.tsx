import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Bug, Globe2, ScanSearch, Workflow } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { vi } from '@/dictionaries/vi'

const points = [
  { icon: ScanSearch, label: 'Săn tìm mối đe dọa chủ động' },
  { icon: Bug, label: 'Phân tích mã độc & lỗ hổng' },
  { icon: Globe2, label: 'Tình báo mối đe dọa toàn cầu' },
  { icon: Workflow, label: 'Tự động hoá quy trình phản ứng' },
]

/**
 * X-Ops style feature block: an abstract "threat intelligence" visual on the
 * left, copy + capability list + CTAs on the right.
 */
export function FeatureBlock() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Visual */}
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-brand-xl)] bg-navy">
              <Image
                src="/secureops/solutions-network-defense.webp"
                alt="Kiến trúc phòng thủ mạng nhiều lớp với luồng dữ liệu được kiểm soát"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent"
                aria-hidden
              />
              <div className="absolute bottom-5 left-5 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur">
                <p className="text-2xl font-extrabold text-white">X-Ops</p>
                <p className="text-xs text-white/60">Threat Intelligence Unit</p>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
              SecureOps X-Ops
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Trí tuệ về mối đe dọa, hợp nhất trên một nền tảng mở
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate">
              Đội ngũ X-Ops hợp nhất chuyên gia săn tìm mối đe dọa, phân tích mã độc và ứng cứu sự
              cố — chia sẻ tình báo theo thời gian thực để bảo vệ bạn trước những kẻ tấn công tinh
              vi nhất.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {points.map((p) => (
                <li key={p.label} className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <p.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-ink">{p.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={vi.routes.contact}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                Liên hệ chuyên gia
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={vi.routes.solutions}
                className="inline-flex items-center rounded-full border border-border-soft bg-white px-6 py-3 text-sm font-semibold text-ink transition-all hover:border-primary hover:text-primary"
              >
                {vi.cta.solutions}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
