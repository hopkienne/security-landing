'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const slides = [
  {
    quote:
      'SecureOps trở thành trung tâm vận hành an ninh của chúng tôi chỉ sau vài tuần. Họ phát hiện và xử lý sự cố nhanh hơn bất kỳ đội nội bộ nào chúng tôi từng có.',
    name: 'Nguyễn Minh Hoàng',
    role: 'CISO, NovaBank',
    company: 'NovaBank',
  },
  {
    quote:
      'Khả năng phản ứng 24/7 và sự minh bạch trong báo cáo giúp ban lãnh đạo hoàn toàn yên tâm về tình trạng an ninh của doanh nghiệp.',
    name: 'Trần Thu Hà',
    role: 'IT Director, VietPharma',
    company: 'VietPharma',
  },
  {
    quote:
      'Đội ngũ chuyên gia đồng hành sát sao, tư vấn lộ trình bảo mật phù hợp với quy mô và ngân sách của chúng tôi. Một đối tác thực sự.',
    name: 'Lê Quốc Bảo',
    role: 'CTO, CloudWave',
    company: 'CloudWave',
  },
]

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (next: number) => {
    setDir(next > index || (index === slides.length - 1 && next === 0) ? 1 : -1)
    setIndex((next + slides.length) % slides.length)
  }

  const slide = slides[index]

  return (
    <section className="bg-bg-soft py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
            Khách hàng nói gì
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Niềm tin từ những doanh nghiệp hàng đầu
          </h2>
        </div>

        <div className="relative mx-auto mt-12 max-w-3xl">
          <div className="relative overflow-hidden rounded-[var(--radius-brand-xl)] border border-border-soft bg-white p-8 shadow-[0_24px_60px_-30px_rgba(10,27,61,0.25)] sm:p-12">
            <Quote className="h-10 w-10 text-primary/15" />
            <div className="relative mt-2 min-h-[160px]">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mt-4 text-xl font-medium leading-relaxed text-ink sm:text-2xl">
                    “{slide.quote}”
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-sm font-bold text-white">
                      {slide.name.charAt(0)}
                    </span>
                    <div>
                      <p className="font-bold text-ink">{slide.name}</p>
                      <p className="text-sm text-slate">{slide.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Trước"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-white text-ink transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Đến slide ${i + 1}`}
                  className={
                    i === index
                      ? 'h-2 w-6 rounded-full bg-primary transition-all'
                      : 'h-2 w-2 rounded-full bg-border-soft transition-all hover:bg-slate/40'
                  }
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Tiếp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-white text-ink transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
