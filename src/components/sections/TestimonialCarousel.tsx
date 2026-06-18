'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ChevronLeft, ChevronRight, Play, Quote } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { vi } from '@/dictionaries/vi'

const slides = [
  {
    quote:
      'SecureOps giúp chúng tôi có đội ngũ theo dõi 24/7. Tốc độ phát hiện và phản ứng là khác biệt lớn nhất khi đối mặt với các cuộc tấn công thực tế.',
    name: 'Nguyễn Minh Hoàng',
    role: 'CISO, NovaBank',
    company: 'NovaBank',
    label: 'Tài chính',
    image: '/secureops/testimonial-soc-team.webp',
  },
  {
    quote:
      'Chúng tôi cần một cách tập trung để bảo vệ dữ liệu và vận hành an toàn trên nhiều hệ thống. SecureOps cho chúng tôi khả năng kiểm soát đó.',
    name: 'Trần Thu Hà',
    role: 'Giám đốc CNTT, Saigon Arena',
    company: 'Saigon Arena',
    label: 'Giải trí',
    image: '/secureops/testimonial-arena-operations.webp',
  },
  {
    quote:
      'Dịch vụ MDR giúp đội ngũ nhìn thấy hoạt động bất thường trên từng điểm cuối và xử lý sớm trước khi sự cố lan rộng trong toàn bộ môi trường.',
    name: 'Lê Quốc Bảo',
    role: 'Trưởng bộ phận An toàn thông tin, VietPharma',
    company: 'VietPharma',
    label: 'Y tế',
    image: '/secureops/testimonial-healthcare-security.webp',
  },
  {
    quote:
      'Nếu hệ thống sản xuất bị tấn công, hoạt động kinh doanh sẽ dừng lại. Giá trị lớn nhất là khả năng phát hiện nhanh và phản ứng có tổ chức.',
    name: 'Phạm Anh Khoa',
    role: 'VP IT Operations, KDC Manufacturing',
    company: 'KDC Manufacturing',
    label: 'Sản xuất',
    image: '/secureops/testimonial-manufacturing-security.webp',
  },
]

const desktopSlideWidth = 1012
const desktopSlideGap = 32
const desktopStep = desktopSlideWidth + desktopSlideGap
const carouselSlides = [slides[slides.length - 1], ...slides, slides[0]]

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [trackIndex, setTrackIndex] = useState(1)
  const [isJumping, setIsJumping] = useState(false)

  const goStep = (direction: 1 | -1) => {
    if (isJumping) return
    setDir(direction)
    setIndex((current) => (current + direction + slides.length) % slides.length)
    setTrackIndex((current) => current + direction)
  }

  const goTo = (next: number) => {
    if (isJumping || next === index) return
    setDir(next > index ? 1 : -1)
    setIndex(next)
    setTrackIndex(next + 1)
  }

  const handleTrackAnimationComplete = () => {
    if (trackIndex === 0) {
      setIsJumping(true)
      setTrackIndex(slides.length)
      window.setTimeout(() => setIsJumping(false), 0)
      return
    }

    if (trackIndex === slides.length + 1) {
      setIsJumping(true)
      setTrackIndex(1)
      window.setTimeout(() => setIsJumping(false), 0)
    }
  }

  return (
    <section className="overflow-hidden bg-bg-soft py-20 sm:py-24">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[3.15rem]">
            Doanh nghiệp giữ an toàn cùng SecureOps như thế nào
          </h2>
          <Link
            href={vi.routes.customers}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-bold text-white shadow-[var(--shadow-glow)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
          >
            Xem tất cả câu chuyện
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative mt-10 lg:left-1/2 lg:mt-14 lg:w-screen lg:-translate-x-1/2">
          <div className="pointer-events-none absolute inset-x-6 top-6 h-44 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative hidden h-[460px] w-screen overflow-hidden lg:block">
            <motion.div
              className="absolute left-0 top-0 flex h-full gap-8"
              animate={{ x: `calc(50vw - ${desktopSlideWidth / 2}px - ${trackIndex * desktopStep}px)` }}
              transition={
                isJumping
                  ? { duration: 0 }
                  : { duration: 0.62, ease: [0.22, 1, 0.36, 1] }
              }
              onAnimationComplete={handleTrackAnimationComplete}
            >
              {carouselSlides.map((item, itemIndex) => (
                <div
                  key={`${item.company}-${itemIndex}`}
                  aria-hidden={itemIndex !== trackIndex}
                  className={
                    itemIndex === trackIndex
                      ? 'h-full w-[1012px] shrink-0 opacity-100 blur-0 grayscale-0 transition-[filter,opacity] duration-300'
                      : 'h-full w-[1012px] shrink-0 opacity-35 blur-[3px] grayscale transition-[filter,opacity] duration-300'
                  }
                >
                  <div className="h-full overflow-hidden rounded-lg shadow-[0_30px_90px_-40px_rgba(8,1,45,0.9)]">
                    <TestimonialSlide
                      slide={item}
                      priority={itemIndex === 1}
                      muted={itemIndex !== trackIndex}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
            <button
              type="button"
              onClick={() => goStep(-1)}
              aria-label="Câu chuyện trước"
              className="absolute left-[calc(50%-590px)] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-[0_18px_44px_-18px_rgba(8,1,45,0.45)] transition-all hover:-translate-y-[calc(50%+1px)] hover:bg-white lg:inline-flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goStep(1)}
              aria-label="Câu chuyện tiếp theo"
              className="absolute right-[calc(50%-590px)] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-[0_18px_44px_-18px_rgba(8,1,45,0.45)] transition-all hover:-translate-y-[calc(50%+1px)] hover:bg-white lg:inline-flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="relative overflow-hidden rounded-lg bg-[#040816] shadow-[0_30px_90px_-40px_rgba(8,1,45,0.9)] lg:hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 72 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -72 }}
                transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                <TestimonialSlide slide={slides[index]} priority={index === 0} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => goStep(-1)}
              aria-label="Câu chuyện trước"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-white text-ink transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {slides.map((item, i) => (
                <button
                  key={item.company}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Đến câu chuyện ${item.company}`}
                  className={
                    i === index
                      ? 'h-2 w-7 rounded-full bg-primary transition-all'
                      : 'h-2 w-2 rounded-full bg-border-soft transition-all hover:bg-slate/40'
                  }
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goStep(1)}
              aria-label="Câu chuyện tiếp theo"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-white text-ink transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 hidden items-center justify-center gap-8 lg:flex">
            {slides.map((item, i) => (
              <button
                key={item.company}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Đến câu chuyện ${item.company}`}
                className={
                  i === index
                    ? 'border-primary text-primary'
                    : 'border-border-soft text-slate hover:border-primary/40 hover:text-ink'
                }
              >
                <span className="inline-flex min-h-[48px] items-center border-b-2 border-current px-2 text-lg font-extrabold tracking-tight transition-colors">
                  {item.company}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function TestimonialSlide({
  slide,
  priority = false,
  muted = false,
}: {
  slide: (typeof slides)[number]
  priority?: boolean
  muted?: boolean
}) {
  return (
    <div className="relative flex min-h-[640px] flex-col overflow-hidden rounded-lg bg-[#040816] lg:h-full lg:min-h-[460px]">
      <div className="absolute inset-x-0 bottom-0 h-[58%] lg:left-auto lg:right-[-72px] lg:top-0 lg:h-full lg:w-[868px]">
        <Image
          src={slide.image}
          alt={muted ? '' : `Câu chuyện khách hàng ${slide.company}`}
          fill
          sizes="(max-width: 1024px) 100vw, 868px"
          className="object-cover"
          priority={priority}
        />
        <div
          className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#040816] to-[#040816]/0 lg:inset-y-0 lg:left-0 lg:h-full lg:w-[489px] lg:bg-gradient-to-r"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#040816] via-[#040816]/5 to-transparent lg:hidden"
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-primary shadow-[0_18px_40px_-18px_rgba(0,0,0,0.65)] transition-transform lg:h-[86px] lg:w-[86px]">
            <Play className="ml-1 h-7 w-7 fill-primary lg:h-9 lg:w-9" />
          </span>
        </div>
      </div>

      <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-30" aria-hidden />

      <div className="relative z-10 flex max-w-[480px] flex-1 flex-col px-6 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
        <div className="mb-7 inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan">
          {slide.label}
        </div>

        <div className="mb-auto">
          <p className="text-3xl font-extrabold tracking-tight text-white">{slide.company}</p>
          <p className="mt-1 text-sm font-semibold text-white/55">Câu chuyện khách hàng</p>
        </div>

        <div className="mt-8 lg:mt-12">
          <Quote className="mb-4 h-9 w-9 text-cyan/65" />
          <blockquote className="text-[1.45rem] font-semibold leading-snug text-white sm:text-[1.7rem] lg:text-[1.55rem]">
            “{slide.quote}”
          </blockquote>
          <div className="mt-6">
            <p className="text-base font-bold text-white">{slide.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-white/70">{slide.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
