'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ChevronDown, Menu, PhoneCall, ShieldAlert } from 'lucide-react'
import type { MegaMenuData } from './nav-data'
import { vi } from '@/dictionaries/vi'
import { CTA, BRAND } from '@/brand/tokens'
import { cn } from '@/lib/utils'
import { MobileNav } from './MobileNav'
import { Logo } from './Logo'

const NAV: { label: string; href: string }[] = [
  { label: vi.nav.about, href: vi.routes.about },
  { label: vi.nav.customers, href: vi.routes.customers },
  { label: vi.nav.news, href: vi.routes.news },
  { label: vi.nav.careers, href: vi.routes.careers },
  { label: vi.nav.contact, href: vi.routes.contact },
]

export function HeaderClient({ menu }: { menu: MegaMenuData; brandName: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [openMega, setOpenMega] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full" onMouseLeave={() => setOpenMega(false)}>
      {/* Utility bar */}
      <div className="hidden bg-navy text-white lg:block">
        <div className="mx-auto flex h-9 w-full max-w-7xl items-center justify-between px-4 text-[13px] sm:px-6 lg:px-8">
          <Link
            href={vi.routes.contact}
            className="inline-flex items-center gap-1.5 font-medium text-white/85 transition-colors hover:text-white"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-cyan" />
            Đang bị tấn công mạng? Phản ứng khẩn cấp 24/7
          </Link>
          <div className="flex items-center gap-5 text-white/80">
            <a
              href={`tel:${BRAND.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              {BRAND.phone}
            </a>
            <Link href={vi.routes.about} className="transition-colors hover:text-white">
              Về SecureOps
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={cn(
          'w-full border-b transition-all duration-300',
          scrolled || openMega
            ? 'border-border-soft bg-white shadow-[0_4px_24px_-12px_rgba(10,27,61,0.18)]'
            : 'border-transparent bg-white/85 backdrop-blur',
        )}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Điều hướng chính">
            <button
              type="button"
              className={cn(
                'inline-flex items-center gap-1 rounded-md px-3 py-2 text-[15px] font-semibold text-ink transition-colors hover:text-primary',
                openMega && 'text-primary',
              )}
              onMouseEnter={() => setOpenMega(true)}
              onClick={() => setOpenMega((v) => !v)}
              aria-expanded={openMega}
            >
              {vi.nav.productsSolutions}
              <ChevronDown
                className={cn('h-4 w-4 transition-transform', openMega && 'rotate-180')}
              />
            </button>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-[15px] font-medium text-ink transition-colors hover:text-primary"
                onMouseEnter={() => setOpenMega(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={vi.routes.contact}
              className="group hidden items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(32,6,247,0.6)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark sm:inline-flex"
            >
              {CTA.primary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Mở menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop mega menu */}
      <AnimatePresence>
        {openMega && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full hidden border-b border-border-soft bg-white shadow-xl lg:block"
            onMouseEnter={() => setOpenMega(true)}
          >
            <div className="mx-auto grid w-full max-w-7xl grid-cols-12 gap-8 px-8 py-8">
              <MegaColumn
                title={vi.nav.products}
                viewAllHref={vi.routes.products}
                groups={menu.productGroups}
                accent="primary"
                onNavigate={() => setOpenMega(false)}
              />
              <MegaColumn
                title={vi.nav.solutions}
                viewAllHref={vi.routes.solutions}
                groups={menu.solutionGroups}
                accent="accent"
                onNavigate={() => setOpenMega(false)}
              />
              <div className="col-span-3">
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-brand-lg)] bg-navy p-6 text-white">
                  <div className="bg-dotgrid absolute inset-0 opacity-60" aria-hidden />
                  <div
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/40 blur-2xl"
                    aria-hidden
                  />
                  <div className="relative">
                    <p className="text-lg font-bold">Bạn cần tư vấn bảo mật?</p>
                    <p className="mt-2 text-sm text-white/75">
                      Đội ngũ chuyên gia SecureOps sẵn sàng đồng hành cùng doanh nghiệp của bạn.
                    </p>
                  </div>
                  <div className="relative mt-6 flex flex-col gap-2">
                    <Link
                      href={vi.routes.contact}
                      onClick={() => setOpenMega(false)}
                      className="rounded-full bg-primary px-4 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-primary-dark"
                    >
                      {CTA.primary}
                    </Link>
                    <Link
                      href={vi.routes.products}
                      onClick={() => setOpenMega(false)}
                      className="rounded-full border border-white/30 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      {CTA.secondaryProducts}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} menu={menu} />
    </header>
  )
}

function MegaColumn({
  title,
  viewAllHref,
  groups,
  accent,
  onNavigate,
}: {
  title: string
  viewAllHref: string
  groups: MegaMenuData['productGroups']
  accent: 'primary' | 'accent'
  onNavigate: () => void
}) {
  return (
    <div className="col-span-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate">{title}</h3>
        <Link
          href={viewAllHref}
          onClick={onNavigate}
          className={cn(
            'inline-flex items-center gap-1 text-xs font-bold',
            accent === 'primary' ? 'text-primary' : 'text-sky',
          )}
        >
          {vi.cta.viewAll} <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      {groups.length === 0 ? (
        <p className="text-sm text-slate">Đang cập nhật nội dung.</p>
      ) : (
        <div className="grid max-h-80 grid-cols-1 gap-x-6 gap-y-4 overflow-y-auto pr-2">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 text-xs font-bold text-ink">{group.label}</p>
              <ul className="space-y-0.5">
                {group.links.slice(0, 6).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="block rounded px-1 py-1 text-sm text-slate transition-colors hover:bg-bg-soft hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
