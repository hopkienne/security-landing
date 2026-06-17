'use client'

import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { CTA, BRAND } from '@/brand/tokens'
import { vi } from '@/dictionaries/vi'

/** Feature cards straddling the bottom of the hero (Sophos: MDR / Endpoint / Identity). */
const cards = [
  {
    tag: 'SecureOps MDR',
    title: 'Trung tâm SOC vận hành 24/7',
    desc: 'Phát hiện và phản ứng được quản lý hoàn toàn, tốc độ AI kết hợp chuyên gia.',
    href: vi.routes.products,
  },
  {
    tag: 'An ninh điểm cuối',
    title: 'Chặn tấn công thời đại AI',
    desc: 'Tự động ngăn chặn các kỹ thuật cốt lõi của mã độc và tấn công có chủ đích.',
    href: vi.routes.products,
  },
  {
    tag: 'Bảo vệ danh tính',
    title: 'Giám sát rủi ro danh tính',
    desc: 'Phát hiện sớm các nguy cơ chiếm đoạt danh tính trước khi bị khai thác.',
    href: vi.routes.solutions,
  },
]

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section className="relative -mt-[68px] overflow-hidden bg-navy-deep text-white lg:-mt-[105px]">
      {/* Full-section background video (Sophos hero pattern). Plays under all
          hero content; hidden for prefers-reduced-motion via .hero-video CSS,
          leaving the poster image + navy backdrop visible. */}
      <video
        className="hero-video absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/secureops/hero-cyber-defense.webp"
        aria-hidden
      >
        <source src="/secureops/hero-pattern.mp4" type="video/mp4" />
      </video>

      {/* Overlays for legibility + brand glow, all above the video. */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/55 to-navy-deep"
        aria-hidden
      />
      <div className="bg-dotgrid absolute inset-0 opacity-30" aria-hidden />
      <div
        className="absolute left-1/2 top-[-12%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]"
        aria-hidden
      />

      <Container className="relative z-10 pt-32 sm:pt-36 lg:pt-[8.775rem]">
        {/* Centered copy on top of the video */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-turquoise"
          >
            Nền tảng an ninh mạng thích ứng AI-Native
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease }}
            className="mt-5 text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.75rem]"
          >
            Làm chủ mọi mối đe dọa
            <br className="hidden sm:block" /> an ninh mạng
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75"
          >
            {BRAND.name} kết hợp trí tuệ về mối đe dọa, AI thích ứng và chuyên gia con người trên
            một nền tảng mở để ngăn chặn tấn công trước khi xảy ra — giúp doanh nghiệp vững vàng
            trước mọi rủi ro, 24/7.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href={vi.routes.contact}
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-base font-semibold text-navy-deep transition-colors hover:bg-white/90"
            >
              {CTA.primary}
            </Link>
            <Link
              href={vi.routes.solutions}
              className="group inline-flex items-center gap-2 rounded-full border border-white/35 px-6 py-3 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              {CTA.secondarySolutions}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Dashboard screenshot floating on top of the video (Sophos Central). */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="relative mx-auto mt-8 max-w-5xl"
        >
          <div
            className="absolute -inset-x-8 -top-6 bottom-0 rounded-[2.5rem] bg-gradient-to-b from-primary/35 via-cyan/10 to-transparent blur-3xl"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/12 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/5">
            <Image
              src="/secureops/hero-cyber-defense.webp"
              alt="Bảng điều khiển nền tảng SecureOps giám sát mối đe dọa theo thời gian thực"
              width={2120}
              height={1044}
              priority
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="block aspect-[2120/1044] w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent"
              aria-hidden
            />
          </div>
        </motion.div>

        {/* Three white feature cards straddling the bottom edge of the dashboard
            image and the seam into the white section below (Sophos pattern). */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease }}
          className="hero-feature-grid relative z-20 mx-auto -mt-36 grid max-w-[76.25rem] gap-4 sm:-mt-[11.75rem] sm:grid-cols-3 sm:gap-[1.875rem] lg:-mt-[17.25rem] lg:w-[76.25rem] lg:max-w-none"
        >
          {cards.map((c) => (
            <Link
              key={c.tag}
              href={c.href}
              className="hero-feature-card group flex flex-col rounded-xl border border-border-soft bg-white p-5 shadow-[0_24px_60px_-30px_rgba(8,1,45,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/10 hover:shadow-[0_30px_70px_-30px_rgba(8,1,45,0.55)] lg:h-[10.35rem]"
            >
              <span className="hero-feature-tag text-[11px] font-bold uppercase tracking-wider text-primary">
                {c.tag}
              </span>
              <span className="hero-feature-title mt-2 text-base font-bold leading-tight text-ink">
                {c.title}
              </span>
              <span className="hero-feature-desc mt-2 flex-1 text-sm leading-snug text-slate">
                {c.desc}
              </span>
              <span className="mt-3 flex justify-end">
                <span className="sr-only">Tìm hiểu {c.title}</span>
                <span
                  className="hero-feature-icon inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_24px_-10px_rgba(32,6,247,0.8)] transition-colors group-hover:bg-primary-dark"
                  aria-hidden
                >
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          ))}
        </motion.div>
      </Container>

      {/* Seam spacer into the white content below */}
      <div className="h-10 sm:h-14" />
    </section>
  )
}
