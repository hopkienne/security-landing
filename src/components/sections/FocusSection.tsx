'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Brain, Network, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const panels = [
  {
    icon: ShieldCheck,
    eyebrow: 'Phòng thủ thích ứng',
    title: 'Dynamic Defenses',
    desc: 'Tự điều chỉnh hàng rào bảo vệ theo tín hiệu thời gian thực, chặn kỹ thuật tấn công trước khi lan rộng.',
    stat: '32%',
    statLabel: 'tấn công khởi đầu từ lỗ hổng bị khai thác',
  },
  {
    icon: Brain,
    eyebrow: 'AI đã được kiểm chứng',
    title: 'Battle-proven AI',
    desc: 'AI phân tích tín hiệu ở quy mô lớn, ưu tiên cảnh báo quan trọng và tự động xử lý sự cố lặp lại.',
    stat: '52%',
    statLabel: 'sự cố được AI xử lý đầu-cuối',
  },
  {
    icon: Network,
    eyebrow: 'Hệ sinh thái mở',
    title: 'Open Ecosystem',
    desc: 'Kết nối công cụ bảo mật và IT hiện có để tạo một quy trình điều tra thống nhất, không còn điểm mù.',
    stat: '350+',
    statLabel: 'tích hợp bảo mật và IT sẵn có',
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
      <MobileFocus />

      <div ref={ref} className="relative hidden lg:block" style={{ height: `${panels.length * 80}vh` }}>
        <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-16">
          <FocusBackdrop />

          <Container className="relative grid items-center gap-14 lg:grid-cols-[0.88fr_1.12fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-normal text-cyan">
                Nền tảng AI-native
              </p>
              <h2 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight tracking-normal">
                Dynamic Defenses, Battle-proven AI và Open Ecosystem
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/65">
                Một lớp vận hành thống nhất giúp đội ngũ bảo mật phòng ngừa, điều tra và phản ứng
                nhanh hơn.
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

            <div className="relative h-[500px]">
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 bg-oxford">
                <Image
                  src="/secureops/products-security-platform.webp"
                  alt="Nền tảng SecureOps hợp nhất dữ liệu bảo mật và quy trình phản ứng"
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover opacity-55 mix-blend-screen"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-br from-navy/30 via-navy/68 to-navy"
                  aria-hidden
                />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent" />
              </div>

              <div className="absolute left-8 top-8">
                <p className="text-xs font-bold uppercase tracking-normal text-cyan">
                  SecureOps Platform
                </p>
                <p className="mt-1 text-sm text-white/65">Telemetry, AI và chuyên gia trên một luồng</p>
              </div>

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

function MobileFocus() {
  return (
    <div className="relative overflow-hidden py-20 lg:hidden">
      <FocusBackdrop />
      <Container className="relative">
        <p className="text-sm font-bold uppercase tracking-normal text-cyan">Nền tảng AI-native</p>
        <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-normal">
          Dynamic Defenses, Battle-proven AI và Open Ecosystem
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/65">
          Một lớp vận hành thống nhất giúp phòng ngừa, điều tra và phản ứng nhanh hơn.
        </p>

        <div className="relative mt-9 aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-white/10 bg-oxford">
          <Image
            src="/secureops/products-security-platform.webp"
            alt="Nền tảng SecureOps hợp nhất dữ liệu bảo mật và quy trình phản ứng"
            fill
            sizes="100vw"
            className="object-cover opacity-60 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" />
        </div>

        <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {panels.map((panel) => (
            <MobilePanel key={panel.title} panel={panel} />
          ))}
        </div>
      </Container>
    </div>
  )
}

function FocusBackdrop() {
  return (
    <>
      <div className="bg-dotgrid absolute inset-0 opacity-35" aria-hidden />
      <div
        className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-cyan/10 blur-3xl"
        aria-hidden
      />
    </>
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
    [0.45, 1, 1, 0.45],
  )

  return (
    <motion.div style={{ opacity }} className="flex items-center gap-4">
      <span className="text-sm font-bold tabular-nums text-white/45">0{index + 1}</span>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-normal text-cyan">{eyebrow}</p>
        <p className="text-lg font-bold tracking-normal text-white">{label}</p>
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
  const opacityInput =
    index === 0
      ? [0, end - pad, end + pad]
      : index === total - 1
        ? [start - pad, start + pad, 1]
        : [start - pad, start + pad, end - pad, end + pad]
  const opacityOutput =
    index === 0 ? [1, 1, 0] : index === total - 1 ? [0, 1, 1] : [0, 1, 1, 0]
  const opacity = useTransform(progress, opacityInput, opacityOutput)
  const y = useTransform(progress, [start, end], [24, -24])
  const Icon = panel.icon

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-8 bottom-8 rounded-2xl border border-white/10 bg-navy/78 p-7 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.9)] backdrop-blur-md"
    >
      <div className="flex items-start gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan to-primary text-white">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-normal text-cyan">{panel.eyebrow}</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-normal">{panel.title}</h3>
          <p className="mt-3 max-w-xl leading-relaxed text-white/70">{panel.desc}</p>
        </div>
      </div>
      <div className="mt-6 flex items-end gap-3 border-t border-white/10 pt-5">
        <span className="text-4xl font-extrabold tracking-normal text-gradient">{panel.stat}</span>
        <span className="pb-1 text-sm text-white/60">{panel.statLabel}</span>
      </div>
    </motion.div>
  )
}

function MobilePanel({ panel }: { panel: (typeof panels)[number] }) {
  const Icon = panel.icon

  return (
    <div className="py-6">
      <div className="flex items-start gap-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-normal text-cyan">{panel.eyebrow}</p>
          <h3 className="mt-2 text-xl font-extrabold tracking-normal">{panel.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/68">{panel.desc}</p>
          <p className="mt-4 text-sm text-white/60">
            <span className="mr-2 text-2xl font-extrabold tracking-normal text-gradient">
              {panel.stat}
            </span>
            {panel.statLabel}
          </p>
        </div>
      </div>
    </div>
  )
}
