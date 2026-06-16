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
    <section className="relative overflow-hidden bg-navy-deep text-white">
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

      <Container className="relative z-10 pt-20 sm:pt-24 lg:pt-28">
        {/* Centered copy on top of the video */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
            </span>
            Nền tảng an ninh mạng thích ứng AI-Native
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease }}
            className="mt-5 text-[2.7rem] font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.1rem]"
          >
            Làm chủ <span className="text-gradient">mọi mối đe dọa</span>
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
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-bold text-white shadow-[0_14px_34px_-10px_rgba(32,6,247,0.75)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              {CTA.primary}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={vi.routes.solutions}
              className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-all hover:border-white/50 hover:bg-white/10"
            >
              {CTA.secondarySolutions}
            </Link>
          </motion.div>
        </div>

        {/* Dashboard screenshot floating on top of the video (Sophos Central). */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="relative mx-auto mt-14 max-w-5xl"
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

        {/* Three feature cards on top of the video, straddling the seam into white. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease }}
          className="relative mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3"
        >
          {cards.map((c) => (
            <Link
              key={c.tag}
              href={c.href}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-cyan/40 hover:bg-white/[0.1]"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan">
                {c.tag}
              </span>
              <span className="mt-2 text-base font-bold text-white">{c.title}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-white/65">{c.desc}</span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90">
                Tìm hiểu
                <ArrowRight className="h-4 w-4 text-cyan transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </motion.div>
      </Container>

      {/* Seam spacer into the white content below */}
      <div className="h-20 sm:h-24" />
    </section>
  )
}
