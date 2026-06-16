'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Brain, Network, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/ui/Container'

/**
 * Sticky scroll-driven "focus" section (Sophos-style). The visual column pins
 * while the user scrolls through a tall track; the active panel swaps based on
 * scroll progress, and a progress rail fills alongside.
 */
const panels = [
  {
    icon: ShieldCheck,
    eyebrow: 'Phòng thủ thích ứng',
    title: 'Dynamic Defenses',
    desc: 'Tự động điều chỉnh hàng rào bảo vệ theo thời gian thực, chặn đứng các kỹ thuật nằm ở trung tâm của mọi cuộc tấn công trước khi chúng kịp lan rộng.',
    stat: '32%',
    statLabel: 'tấn công khởi đầu từ lỗ hổng bị khai thác',
  },
  {
    icon: Brain,
    eyebrow: 'AI đã được kiểm chứng',
    title: 'Battle-proven AI',
    desc: 'AI thích ứng phân tích hàng tỷ tín hiệu mỗi ngày, kết hợp phán đoán của chuyên gia để giải quyết 52% sự cố hoàn toàn tự động trong vài giây.',
    stat: '52%',
    statLabel: 'sự cố được AI xử lý đầu-cuối',
  },
  {
    icon: Network,
    eyebrow: 'Hệ sinh thái mở',
    title: 'Open Ecosystem',
    desc: 'Tích hợp liền mạch với hơn 350 công cụ bảo mật và IT bạn đang dùng — mang stack của bạn, hoặc dùng của chúng tôi. Không khoảng mù, một quy trình điều tra duy nhất.',
    stat: '350+',
    statLabel: 'tích hợp bảo mật & IT sẵn có',
  },
]

export function FocusSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return (
    <section className="bg-navy text-white">
      <div ref={ref} className="relative" style={{ height: `${panels.length * 100}vh` }}>
        <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-20">
          <div className="bg-dotgrid absolute inset-0 opacity-40" aria-hidden />
          <div
            className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-primary/25 blur-3xl"
            aria-hidden
          />
          <Container className="relative grid items-center gap-12 lg:grid-cols-2">
            {/* Left: heading + progress rail */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan">
                Lợi thế SecureOps
              </p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-[2.7rem]">
                Ba trụ cột tạo nên nền tảng phòng thủ vượt trội
              </h2>
              <p className="mt-5 max-w-md text-lg text-white/65">
                Cuộn để khám phá cách chúng tôi kết hợp công nghệ thích ứng, AI và hệ sinh thái mở
                để bảo vệ doanh nghiệp của bạn.
              </p>

              <div className="mt-10 space-y-5">
                {panels.map((panel, i) => (
                  <ProgressRow
                    key={panel.title}
                    index={i}
                    total={panels.length}
                    progress={scrollYProgress}
                    label={panel.title}
                    eyebrow={panel.eyebrow}
                  />
                ))}
              </div>
            </div>

            {/* Right: stacked panels cross-fading by scroll */}
            <div className="relative h-[360px] sm:h-[380px]">
              {panels.map((panel, i) => (
                <Panel
                  key={panel.title}
                  index={i}
                  total={panels.length}
                  progress={scrollYProgress}
                  panel={panel}
                />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}

function ProgressRow({
  index,
  total,
  progress,
  label,
  eyebrow,
}: {
  index: number
  total: number
  progress: MotionValue<number>
  label: string
  eyebrow: string
}) {
  const start = index / total
  const end = (index + 1) / total
  const fill = useTransform(progress, [start, end], ['0%', '100%'])
  const opacity = useTransform(
    progress,
    [start - 0.08, start, end, end + 0.08],
    [0.4, 1, 1, 0.4],
  )

  return (
    <motion.div style={{ opacity }} className="flex items-center gap-4">
      <span className="text-sm font-bold tabular-nums text-white/50">
        0{index + 1}
      </span>
      <div className="flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan">
          {eyebrow}
        </p>
        <p className="text-lg font-bold text-white">{label}</p>
        <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            style={{ width: fill }}
            className="h-full rounded-full bg-gradient-to-r from-cyan to-primary"
          />
        </div>
      </div>
    </motion.div>
  )
}

function Panel({
  index,
  total,
  progress,
  panel,
}: {
  index: number
  total: number
  progress: MotionValue<number>
  panel: (typeof panels)[number]
}) {
  const start = index / total
  const end = (index + 1) / total
  const pad = 0.08
  const opacity = useTransform(
    progress,
    [start - pad, start + pad, end - pad, end + pad],
    [0, 1, 1, 0],
  )
  const y = useTransform(progress, [start, end], [30, -30])
  const Icon = panel.icon

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-md"
    >
      <div>
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-light to-primary text-white">
          <Icon className="h-7 w-7" />
        </span>
        <h3 className="mt-6 text-2xl font-extrabold">{panel.title}</h3>
        <p className="mt-3 text-white/70">{panel.desc}</p>
      </div>
      <div className="mt-6 flex items-end gap-3 border-t border-white/10 pt-5">
        <span className="text-4xl font-extrabold text-gradient">{panel.stat}</span>
        <span className="pb-1 text-sm text-white/60">{panel.statLabel}</span>
      </div>
    </motion.div>
  )
}
