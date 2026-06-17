import { BadgeCheck, Network, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Phòng ngừa',
    desc: 'Chủ động giảm bề mặt tấn công và chặn kỹ thuật cốt lõi trước khi chúng trở thành sự cố.',
  },
  {
    icon: BadgeCheck,
    title: 'Tin cậy',
    desc: 'AI tăng tốc điều tra, chuyên gia con người giữ phán đoán và chịu trách nhiệm kết quả.',
  },
  {
    icon: Network,
    title: 'Nền tảng mở',
    desc: 'Kết nối dữ liệu từ endpoint, network, cloud, identity và email để tạo một quy trình điều tra thống nhất.',
  },
]

export function AdvantageSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <Reveal>
            <div>
              <p className="text-sm font-bold uppercase tracking-normal text-primary">
                Lợi thế SecureOps
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-normal text-ink sm:text-4xl">
                Ba trụ cột cho phòng thủ an ninh mạng hiện đại
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-2xl text-lg leading-relaxed text-slate lg:ml-auto">
              Ít điểm rời rạc hơn, nhiều ngữ cảnh hơn: SecureOps kết nối công nghệ, dữ liệu và con
              người thành một hệ thống phản ứng nhất quán.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid border-y border-border-soft lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.06}>
              <article className="h-full border-b border-border-soft py-8 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <pillar.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 text-xl font-extrabold tracking-normal text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate">{pillar.desc}</p>
                <div
                  className="mt-8 h-px w-24 bg-gradient-to-r from-cyan via-primary to-transparent"
                  aria-hidden
                />
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
