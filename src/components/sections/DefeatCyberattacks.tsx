import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

const capabilities = [
  {
    icon: '/secureops/icon-ai-blue.svg',
    desc: 'Trao quyền cho tổ chức của bạn - từ doanh nghiệp nhỏ đến tập đoàn lớn - với giải pháp có thể mở rộng và hỗ trợ chuyên gia phù hợp.',
  },
  {
    icon: '/secureops/icon-orchestration-blue.svg',
    desc: 'Bảo vệ 24/7 thông qua dịch vụ phát hiện và phản ứng được dẫn dắt bởi chuyên gia, giúp phát hiện và xử lý mối đe dọa theo thời gian thực.',
  },
  {
    icon: '/secureops/icon-time-blue.svg',
    desc: 'Đơn giản hóa an ninh mạng với nền tảng mở, tích hợp và thích ứng với mọi hạ tầng, tối đa hóa khoản đầu tư hiện có.',
  },
]

export function DefeatCyberattacks() {
  return (
    <section className="relative z-10 overflow-x-clip bg-[#eef4fb] py-16 sm:py-20 lg:py-28 xl:py-32">
      <Container className="max-w-[1280px]">
        <div className="grid items-start gap-12 xl:grid-cols-[550px_minmax(0,600px)] xl:gap-[80px]">
          <Reveal className="order-2 w-full xl:order-1">
            <div className="relative mx-auto w-full max-w-[550px] xl:mx-0">
              <div
                className="absolute -bottom-[230px] left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,237,255,0.58)_0%,rgba(0,156,251,0.42)_28%,rgba(32,6,247,0.28)_52%,transparent_72%)] blur-3xl"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-md bg-navy shadow-[0_28px_70px_-42px_rgba(8,1,45,0.7)]">
                <a
                  href="https://www.youtube.com/embed/VzTjoMlsdT0?autoplay=1&loop=1&modestbranding=1&rel=0"
                  aria-label="Phát video giới thiệu năng lực an ninh mạng SecureOps"
                  className="group relative block aspect-video w-full cursor-pointer"
                >
                  <Image
                    src="/secureops/defeat-video-thumbnail.webp"
                    alt="Video giới thiệu cách SecureOps giúp doanh nghiệp đánh bại tấn công mạng"
                    width={800}
                    height={450}
                    sizes="(min-width: 1280px) 550px, (min-width: 640px) 70vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 rounded-md bg-navy/0 transition-colors duration-200 group-hover:bg-navy/10" />
                  <span className="absolute left-0 top-[20%] h-[190px] w-[190px] -translate-x-[54%] rounded-full border border-white/80" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/secureops/play.png"
                      alt=""
                      width={90}
                      height={90}
                      aria-hidden
                      className="h-[68px] w-[68px] drop-shadow-[0_16px_24px_rgba(8,1,45,0.28)] transition-transform duration-200 group-hover:scale-110 lg:h-[90px] lg:w-[90px]"
                    />
                  </span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 xl:order-2">
            <div className="max-w-[600px] pt-1 xl:pt-2">
              <h2 className="text-[2.45rem] font-medium leading-[1.06] tracking-normal text-ink sm:text-5xl lg:text-[3.35rem]">
                Đánh bại tấn công mạng
              </h2>
              <p className="mt-5 max-w-[560px] text-base leading-[1.62] text-[#454a55] sm:text-lg">
                SecureOps cung cấp an ninh mạng thích ứng, được hỗ trợ bởi AI và các chuyên gia thực
                chiến, giúp tổ chức luôn an toàn, bền bỉ và tự do phát triển.
              </p>

              <div className="mt-9 space-y-7">
                {capabilities.map((item) => (
                  <div key={item.desc} className="grid grid-cols-[40px_minmax(0,1fr)] gap-5">
                    <span className="mt-1 flex h-10 w-10 items-start justify-center">
                      <Image src={item.icon} alt="" width={40} height={40} aria-hidden />
                    </span>
                    <p className="text-base leading-[1.65] text-[#454a55]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
