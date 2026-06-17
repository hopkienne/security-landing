import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Blocks, Clock3, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { vi } from '@/dictionaries/vi'

const capabilities = [
  {
    icon: ShieldCheck,
    title: 'Ngăn chặn sớm',
    desc: 'Giảm nguy cơ từ mã độc, khai thác lỗ hổng và hành vi bất thường ngay khi tín hiệu xuất hiện.',
  },
  {
    icon: Clock3,
    title: 'Phản ứng 24/7',
    desc: 'Chuyên gia giám sát, điều tra và phối hợp xử lý sự cố trong mọi khung giờ.',
  },
  {
    icon: Blocks,
    title: 'Tích hợp hệ sinh thái',
    desc: 'Kết nối endpoint, cloud, identity, email và network để giảm điểm mù vận hành.',
  },
]

export function DefeatCyberattacks() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="text-sm font-bold uppercase tracking-normal text-primary">
                Đánh bại tấn công mạng
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-normal text-ink sm:text-4xl lg:text-5xl">
                Bảo vệ doanh nghiệp trước mọi giai đoạn tấn công
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">
                SecureOps kết hợp AI thích ứng, chuyên gia vận hành 24/7 và nền tảng mở để phát
                hiện, ngăn chặn và phản ứng trước khi rủi ro lan rộng.
              </p>

              <div className="mt-9 divide-y divide-border-soft border-y border-border-soft">
                {capabilities.map((item) => (
                  <div key={item.title} className="flex gap-4 py-5">
                    <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold tracking-normal text-ink">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href={vi.routes.solutions}
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-colors hover:bg-primary-dark"
              >
                Khám phá cách phòng thủ
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[2rem] bg-navy shadow-[0_34px_90px_-42px_rgba(8,1,45,0.65)]">
              <Image
                src="/secureops/hero-cyber-defense.webp"
                alt="Bảng điều khiển SecureOps phân tích tín hiệu tấn công theo thời gian thực"
                width={2120}
                height={1044}
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="aspect-[5/4] w-full object-cover object-[62%_50%] sm:aspect-[16/10] lg:aspect-[5/4]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy/88 via-navy/20 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-end justify-between gap-4 border-t border-white/15 pt-4 text-white sm:inset-x-7 sm:bottom-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-normal text-cyan">
                    Threat signal
                  </p>
                  <p className="mt-1 text-xl font-extrabold tracking-normal">Điều phối phòng thủ</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-extrabold text-gradient">24/7</p>
                  <p className="text-xs text-white/65">SOC vận hành liên tục</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
