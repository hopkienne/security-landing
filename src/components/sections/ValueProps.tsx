import { Eye, Gauge, Headphones, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

const items = [
  {
    icon: ShieldCheck,
    title: 'Phòng thủ thích ứng',
    desc: 'Kết hợp AI và chuyên gia để ngăn chặn tấn công trước khi gây thiệt hại.',
  },
  {
    icon: Gauge,
    title: 'Phản ứng tức thời',
    desc: 'Phát hiện và xử lý sự cố trong vài phút, giảm thiểu rủi ro gián đoạn.',
  },
  {
    icon: Headphones,
    title: 'Chuyên gia đồng hành',
    desc: 'Đội ngũ kỹ sư bảo mật giàu kinh nghiệm hỗ trợ doanh nghiệp 24/7.',
  },
  {
    icon: Eye,
    title: 'Minh bạch & đo lường',
    desc: 'Báo cáo rõ ràng, chỉ số an ninh trực quan giúp ra quyết định nhanh.',
  },
]

export function ValueProps() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
            Đánh bại tấn công mạng
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Bốn cách SecureOps giữ doanh nghiệp luôn an toàn
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="group h-full rounded-[var(--radius-brand-lg)] border border-border-soft bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-glow)]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <item.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
