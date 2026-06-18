'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'

const slides = [
  {
    title: 'Phòng thủ linh hoạt',
    description:
      'Lớp bảo vệ được cập nhật theo tín hiệu thời gian thực, trong khi cơ chế phòng thủ thích ứng tự động phản ứng trước mối đe dọa.',
    image: '/secureops/focus-scroll-secureops-1.webp',
    imageAlt: 'Bảng điều khiển SecureOps hiển thị cảnh báo và trạng thái bảo mật',
    cta: 'Tìm hiểu SecureOps Central',
    href: '/san-pham',
  },
  {
    title: 'AI đã được kiểm chứng',
    description:
      'Hơn 50 năng lực GenAI và học sâu giúp tăng cường phòng thủ, ưu tiên sự cố quan trọng và tăng tốc vận hành an ninh.',
    image: '/secureops/focus-scroll-secureops-2.webp',
    imageAlt: 'Các màn hình phân tích sự cố bảo mật được hỗ trợ bởi AI',
    cta: 'Xem mô phỏng tấn công',
    href: 'https://www.youtube.com/watch?v=LeU-hFAzGuM',
  },
  {
    title: 'Hệ sinh thái mở',
    description:
      'SecureOps Central kết nối với sản phẩm SecureOps, công cụ từ nhà cung cấp khác hoặc mọi kết hợp mà hạ tầng của bạn đang sử dụng.',
    image: '/secureops/focus-scroll-secureops-3.webp',
    imageAlt: 'Lưới tích hợp hệ sinh thái bảo mật SecureOps',
    cta: 'Khám phá tích hợp SecureOps',
    href: '/giai-phap',
  },
]

export function FocusSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 45%', 'end 55%'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextIndex = Math.min(slides.length - 1, Math.max(0, Math.floor(latest * slides.length)))
    setActiveIndex(nextIndex)
  })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-oxford py-16 text-white md:overflow-visible md:py-20 lg:py-32"
    >
      <FocusBackdrop />

      <Container className="relative z-10">
        <div className="mx-auto mb-[62px] max-w-[1035px] text-center">
          <h2 className="text-[2.15rem] font-semibold leading-[1.08] tracking-normal text-white md:text-[3rem] lg:text-[4.25rem]">
            Nền tảng an ninh mạng AI-native thích ứng
          </h2>
          <p className="mx-auto mt-5 max-w-[890px] text-base leading-[1.7] text-white/82 md:text-lg lg:text-xl">
            SecureOps Central mang đến lớp bảo vệ mạnh mẽ cho tổ chức và khuếch đại năng lực của
            đội ngũ phòng thủ. Phòng thủ linh hoạt, AI đã được kiểm chứng và hệ sinh thái tích hợp
            mở cùng hội tụ trong một nền tảng an ninh mạng AI-native.
          </p>
        </div>

        <div className="hidden items-start gap-8 md:flex md:flex-row md:flex-nowrap xl:gap-20">
          <div className="sticky top-[120px] h-[430px] flex-[0_0_50%] lg:top-[150px] lg:h-[520px] xl:top-[180px] xl:flex-[0_0_60%]">
            {slides.map((slide, index) => (
              <motion.div
                key={slide.title}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  scale: activeIndex === index ? 1 : 0.985,
                }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="absolute left-0 top-0 h-full w-full"
                aria-hidden={activeIndex !== index}
              >
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 732px, 50vw"
                  className="object-contain"
                  priority={index === 0}
                />
              </motion.div>
            ))}
          </div>

          <div className="flex-[0_0_calc(50%_-_40px)] xl:flex-[0_0_calc(40%_-_80px)]">
            {slides.map((slide, index) => (
              <article
                key={slide.title}
                className={cn(
                  'flex min-h-[270px] flex-col py-12 xl:min-h-[450px] xl:pt-[105px]',
                  index === slides.length - 1 ? 'xl:pb-20' : 'xl:pb-[155px]',
                )}
                data-card={`slide-${index}`}
              >
                <h3 className="mb-5 text-3xl font-semibold leading-tight tracking-normal text-white lg:text-[2.45rem]">
                  {slide.title}
                </h3>
                <p className="text-base leading-[1.7] text-white/84 lg:text-lg">{slide.description}</p>
                <FocusLink href={slide.href} className="mt-[43px]">
                  {slide.cta}
                </FocusLink>
              </article>
            ))}
          </div>
        </div>

        <div className="md:hidden">
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3">
            {slides.map((slide) => (
              <article
                key={slide.title}
                className="flex min-w-[86%] snap-center flex-col rounded-[10px] border border-white/30 bg-white/10 pb-6 pt-3 backdrop-blur-[15px]"
              >
                <div className="relative h-[191px] w-full">
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    sizes="86vw"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col px-6 pt-7">
                  <h3 className="text-2xl font-semibold leading-tight tracking-normal text-white">
                    {slide.title}
                  </h3>
                  <p className="mt-4 text-base leading-[1.65] text-white/82">{slide.description}</p>
                  <FocusLink href={slide.href} className="mt-8">
                    {slide.cta}
                  </FocusLink>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 h-1.25 overflow-hidden rounded-full bg-white/20" aria-hidden>
            <div className="h-full w-1/3 rounded-full bg-white" />
          </div>
        </div>
      </Container>
    </section>
  )
}

function FocusBackdrop() {
  return (
    <div className="pointer-events-none absolute right-0 top-0 h-[1016px] w-[499px] md:h-full md:w-full">
      <Image
        src="/secureops/focus-scroll-bg.webp"
        alt=""
        fill
        sizes="100vw"
        className="h-full w-full object-cover"
        aria-hidden
      />
    </div>
  )
}

function FocusLink({
  href,
  children,
  className,
}: {
  href: string
  children: string
  className?: string
}) {
  const classes = cn(
    'inline-flex w-fit items-center gap-2 text-base font-bold text-white underline-offset-4 transition-colors hover:text-cyan hover:underline',
    className,
  )

  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <ArrowRight className="h-4 w-4" />
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  )
}
