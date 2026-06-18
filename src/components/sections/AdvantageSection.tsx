import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

const pillars = [
  {
    icon: '/secureops/advantage-icon-prevention.svg',
    title: 'Phòng ngừa',
    desc: 'Cách tiếp cận của SecureOps chặn nhiều mối đe dọa ngay từ đầu, giảm rủi ro và rút ngắn thời gian điều tra, phản ứng.',
  },
  {
    icon: '/secureops/advantage-icon-trust.svg',
    title: 'Tin cậy',
    desc: 'Được tin dùng bởi các tổ chức cần bảo vệ liên tục, với chuyên gia an ninh luôn đồng hành cùng công nghệ AI thích ứng.',
  },
  {
    icon: '/secureops/advantage-icon-platform.svg',
    title: 'Nền tảng',
    desc: 'Hệ sinh thái sản phẩm hỗ trợ nhiều tích hợp với giải pháp bên thứ ba, cùng dịch vụ có thể tùy biến theo nhu cầu vận hành.',
  },
]

export function AdvantageSection() {
  return (
    <section className="bg-[#eef4fb] pb-16 pt-12 sm:pb-20 sm:pt-14 lg:pb-28 lg:pt-0">
      <Container>
        <Reveal>
          <div className="mb-12 lg:mb-16">
            <h2 className="max-w-4xl text-[2.35rem] font-medium leading-[1.08] tracking-normal text-ink sm:text-5xl lg:text-[3.35rem]">
              Lợi thế SecureOps trong an ninh mạng
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.06}>
              <article className="relative flex h-full min-h-[230px] flex-col pb-8">
                <Image
                  src={pillar.icon}
                  alt=""
                  width={40}
                  height={40}
                  aria-hidden
                  className="mb-5 h-10 w-10 object-contain lg:mb-10"
                />
                <h3 className="mb-3 text-2xl font-medium leading-tight tracking-normal text-ink">
                  {pillar.title}
                </h3>
                <p className="max-w-[360px] text-base leading-[1.65] tracking-[0.01em] text-[#454a55]">
                  {pillar.desc}
                </p>
                <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-cyan via-primary to-transparent" />
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
