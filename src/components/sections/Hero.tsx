'use client'

import { motion } from 'motion/react'
import { Activity, Lock, ShieldCheck, Wifi } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { CTA, BRAND } from '@/brand/tokens'
import { vi } from '@/dictionaries/vi'

const signals = [
  { icon: ShieldCheck, label: 'Mối đe dọa đã chặn', value: '1.284', tone: 'primary' },
  { icon: Activity, label: 'Thời gian phản ứng', value: '89 giây', tone: 'accent' },
  { icon: Lock, label: 'Điểm cuối được bảo vệ', value: '12.5K', tone: 'primary' },
  { icon: Wifi, label: 'Giám sát', value: '24/7', tone: 'accent' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border-soft bg-bg-soft">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
      <div
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <Container className="relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-sm font-medium text-primary"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Nền tảng an ninh mạng cho doanh nghiệp
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Làm chủ mọi mối đe dọa an ninh mạng
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-slate"
          >
            {BRAND.name} kết hợp trí tuệ về mối đe dọa, AI thích ứng và chuyên gia con người để
            phát hiện và phản ứng với tấn công 24/7 — giúp doanh nghiệp của bạn vững vàng trước
            mọi rủi ro.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href={vi.routes.contact}
              className="inline-flex items-center rounded-[var(--radius-brand)] bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              {CTA.primary}
            </Link>
            <Link
              href={vi.routes.solutions}
              className="inline-flex items-center rounded-[var(--radius-brand)] border border-border-soft bg-white px-7 py-3.5 text-base font-semibold text-ink transition-all hover:border-primary hover:text-primary"
            >
              {CTA.secondarySolutions}
            </Link>
          </motion.div>
        </div>

        {/* Telemetry / signal cards */}
        <div className="relative grid grid-cols-2 gap-4">
          {signals.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="rounded-[var(--radius-brand-lg)] border border-border-soft bg-white/90 p-5 shadow-sm backdrop-blur"
            >
              <motion.span
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-brand)] ${
                  s.tone === 'primary' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
                }`}
              >
                <s.icon className="h-5 w-5" />
              </motion.span>
              <p className="mt-3 text-2xl font-bold text-ink">{s.value}</p>
              <p className="text-sm text-slate">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
