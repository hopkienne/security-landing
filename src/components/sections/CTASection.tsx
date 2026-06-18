import Link from 'next/link'
import { ArrowRight, CheckCircle2, KeyRound, Radar, ShieldAlert } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { vi } from '@/dictionaries/vi'

const assessmentPoints = [
  {
    icon: Radar,
    label: 'Phát hiện sớm dấu hiệu tấn công',
  },
  {
    icon: ShieldAlert,
    label: 'Ưu tiên rủi ro cần xử lý ngay',
  },
  {
    icon: KeyRound,
    label: 'Rà soát truy cập và tài khoản đặc quyền',
  },
]

export function CTASection({
  title = 'Doanh nghiệp của bạn đang được bảo vệ đến đâu?',
  subtitle = 'Nhận đánh giá sơ bộ về các điểm rủi ro phổ biến trong hệ thống, từ giám sát, phản ứng sự cố đến bảo vệ dữ liệu và tài khoản đặc quyền.',
}: {
  title?: string
  subtitle?: string
}) {
  return (
    <section className="bg-[#f6f9fc] py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Đánh giá nhanh
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate">{subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={vi.routes.contact}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-bold text-white shadow-[var(--shadow-glow)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                Đánh giá miễn phí
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={vi.routes.solutions}
                className="inline-flex items-center rounded-full border border-border-soft bg-white px-7 py-3.5 text-base font-semibold text-ink transition-all hover:border-primary hover:text-primary"
              >
                Xem năng lực SecureOps
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-border-soft bg-white p-5 shadow-[0_24px_60px_-42px_rgba(8,1,45,0.55)] sm:p-6">
            <div className="flex items-start justify-between gap-4 border-b border-border-soft pb-5">
              <div>
                <p className="text-sm font-bold text-ink">Tóm tắt hiện trạng bảo mật</p>
                <p className="mt-1 text-sm leading-relaxed text-slate">
                  Một phiên trao đổi ngắn để xác định vùng rủi ro ưu tiên.
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                30 phút
              </span>
            </div>

            <ul className="mt-5 space-y-4">
              {assessmentPoints.map((point) => (
                <li key={point.label} className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef4fb] text-primary">
                    <point.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold leading-snug text-ink">{point.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-lg bg-[#eef4fb] p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-slate">
                  Sau buổi đánh giá, bạn có danh sách ưu tiên rõ ràng thay vì một bản tư vấn chung
                  chung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
