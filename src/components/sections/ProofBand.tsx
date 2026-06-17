import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

const logos = [
  'NovaBank',
  'VietPharma',
  'TechHub',
  'GreenLogistics',
  'MetroRetail',
  'CloudWave',
]

const stats = [
  { value: '24/7', label: 'Giám sát và phản ứng sự cố' },
  { value: '52%', label: 'Sự cố được AI xử lý tự động' },
  { value: '99,9%', label: 'Tỷ lệ phát hiện mối đe dọa' },
  { value: '<15ph', label: 'Thời gian phản ứng trung bình' },
]

export function ProofBand() {
  return (
    <section className="bg-[#edf2f9] py-14 sm:py-16">
      <Container>
        <Reveal>
          <p className="text-center text-sm font-bold uppercase tracking-normal text-slate">
            Đồng hành cùng các doanh nghiệp cần phòng thủ liên tục
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-lg font-extrabold tracking-normal text-slate/45 transition-colors hover:text-primary"
              >
                {logo}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 border-y border-[#d7e2ef] lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.05}>
              <div className="h-full px-3 py-7 text-center sm:px-6 lg:border-l lg:border-[#d7e2ef] lg:first:border-l-0">
                <p className="text-4xl font-extrabold tracking-normal text-primary sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mx-auto mt-2 max-w-40 text-sm leading-snug text-slate">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
