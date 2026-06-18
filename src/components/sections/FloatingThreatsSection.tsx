import { ArrowRight } from 'lucide-react'
import { Inter, Lexend_Exa } from 'next/font/google'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { FloatingParallaxImage } from '@/components/sections/FloatingParallaxImage'
import { vi } from '@/dictionaries/vi'

const lexendExa = Lexend_Exa({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
})

const floatingImages = [
  {
    src: '/secureops/floating-parallax-4.webp',
    alt: 'Chuyen gia van hanh bao mat voi laptop tai hien truong',
    className:
      'z-[15] right-[100px] top-[55px] h-[65px] w-[55px] md:right-5 md:top-[60px] md:h-[130px] md:w-[110px] lg:right-[100px] lg:top-[95px] xl:right-[370px]',
    baseY: 44,
    rangeY: -34,
    floatY: 8,
    phase: 0.2,
  },
  {
    src: '/secureops/floating-parallax-5.webp',
    alt: 'Chuyen gia phan tich moi de doa trong trung tam van hanh',
    className:
      'z-[15] bottom-[-15px] left-[145px] h-[65px] w-[55px] md:bottom-[-10px] md:left-[380px] md:h-[130px] md:w-[110px] lg:left-[410px]',
    baseY: -29,
    rangeY: 26,
    floatY: 6,
    phase: 1.4,
  },
  {
    src: '/secureops/floating-parallax-1.png',
    alt: 'Nhan vien lam viec an toan tren laptop',
    className:
      'z-20 -left-[41px] top-[106px] h-[145px] w-[125px] md:left-5 md:top-[200px] md:h-[210px] md:w-[180px] lg:h-[290px] lg:w-[250px] xl:left-[110px] xl:top-[150px]',
    baseY: -73,
    rangeY: 58,
    floatY: 10,
    phase: 2.1,
  },
  {
    src: '/secureops/floating-parallax-2.webp',
    alt: 'Ky su kiem tra ha tang may chu',
    className:
      'z-50 bottom-[69px] -left-12 h-[130px] w-[110px] md:bottom-[60px] md:left-5 md:h-[241px] md:w-[200px] lg:-left-5 lg:bottom-10 lg:h-[261px] lg:w-[220px] xl:-left-[30px] xl:bottom-32',
    baseY: 44,
    rangeY: -36,
    floatY: 9,
    phase: 3,
  },
  {
    src: '/secureops/floating-parallax-3.webp',
    alt: 'Chuyen gia an ninh phan tich tren laptop',
    className:
      'z-20 bottom-[162px] -right-7 h-[100px] w-[90px] md:bottom-[300px] md:-right-20 md:h-[180px] md:w-[150px] lg:bottom-80 lg:-right-[30px] lg:h-[200px] lg:w-[180px] xl:right-20',
    baseY: 73,
    rangeY: -58,
    floatY: 7,
    phase: 4.2,
  },
]

export function FloatingThreatsSection() {
  return (
    <section
      aria-label="Floating images with parallax content section"
      className="overflow-hidden bg-[#eef4fb] lg:pb-8"
    >
      <div className="relative h-[720px] bg-[#eef4fb] md:h-[1060px]">
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-10 h-[848px] w-screen -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,#fff_20%,#fff_80%,rgba(255,255,255,0)_100%)] md:top-[113px] md:h-[1466px]"
          aria-hidden
        />

        <Container className="relative h-full">
          {floatingImages.map((image) => (
            <FloatingParallaxImage
              key={image.src}
              src={image.src}
              alt={image.alt}
              className={image.className}
              baseY={image.baseY}
              rangeY={image.rangeY}
              floatY={image.floatY}
              phase={image.phase}
            />
          ))}

          <div className="relative z-20 flex h-full items-center justify-center">
            <Reveal>
              <div className="mx-auto flex max-w-[930px] flex-col items-center text-center">
                <h2
                  className={`${lexendExa.className} text-[1.85rem] font-normal leading-[1.12] tracking-normal text-ink sm:text-[2.6rem] md:text-[3rem] lg:text-[3.25rem] xl:text-[2.75rem]`}
                >
                  Chặn mối đe dọa
                  <br />
                  trước khi tấn công
                </h2>
                <p
                  className={`${inter.className} mt-5 max-w-[606px] text-base leading-[1.68] text-[#454a55] sm:text-lg`}
                >
                  SecureOps tiếp cận bảo mật theo hướng phòng ngừa trước: ngăn ransomware, phishing
                  và tấn công dựa trên thông tin đăng nhập trước khi lan rộng, giúp đội ngũ giảm
                  nhiễu và tập trung vào điều quan trọng.
                </p>
                <div className="mt-10 md:mt-8">
                  <Button href={vi.routes.contact} size="lg" className="px-8">
                    Liên hệ chuyên gia SecureOps
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  )
}
