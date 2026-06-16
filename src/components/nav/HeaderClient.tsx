'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Menu, ShieldCheck } from 'lucide-react'
import type { MegaMenuData } from './nav-data'
import { vi } from '@/dictionaries/vi'
import { CTA } from '@/brand/tokens'
import { cn } from '@/lib/utils'
import { MobileNav } from './MobileNav'

const NAV: { label: string; href: string }[] = [
  { label: vi.nav.about, href: vi.routes.about },
  { label: vi.nav.customers, href: vi.routes.customers },
  { label: vi.nav.news, href: vi.routes.news },
  { label: vi.nav.careers, href: vi.routes.careers },
  { label: vi.nav.contact, href: vi.routes.contact },
]

export function HeaderClient({ menu, brandName }: { menu: MegaMenuData; brandName: string }) {
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
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        scrolled
          ? 'border-border-soft bg-white/90 shadow-sm backdrop-blur'
          : 'border-transparent bg-white/70 backdrop-blur',
      )}
      onMouseLeave={() => setOpenMega(false)}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-ink">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-brand)] bg-primary text-white">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="text-xl tracking-tight">{brandName}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng chính">
          <button
            type="button"
            className={cn(
              'inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-primary',
              openMega && 'text-primary',
            )}
            onMouseEnter={() => setOpenMega(true)}
            onClick={() => setOpenMega((v) => !v)}
            aria-expanded={openMega}
          >
            {vi.nav.productsSolutions}
            <ChevronDown className={cn('h-4 w-4 transition-transform', openMega && 'rotate-180')} />
          </button>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-primary"
              onMouseEnter={() => setOpenMega(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={vi.routes.contact}
            className="hidden rounded-[var(--radius-brand)] bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary-dark sm:inline-flex"
          >
            {CTA.primary}
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

      {/* Desktop mega menu */}
      <AnimatePresence>
        {openMega && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-x-0 top-16 hidden border-b border-border-soft bg-white shadow-xl lg:block"
            onMouseEnter={() => setOpenMega(true)}
          >
            <div className="mx-auto grid w-full max-w-7xl grid-cols-12 gap-8 px-8 py-8">
              <MegaColumn
                title={vi.nav.products}
                viewAllHref={vi.routes.products}
                groups={menu.productGroups}
                accent="primary"
              />
              <MegaColumn
                title={vi.nav.solutions}
                viewAllHref={vi.routes.solutions}
                groups={menu.solutionGroups}
                accent="accent"
              />
              <div className="col-span-3">
                <div className="flex h-full flex-col justify-between rounded-[var(--radius-brand-lg)] bg-gradient-to-br from-primary to-accent p-6 text-white">
                  <div>
                    <p className="text-lg font-semibold">Bạn cần tư vấn bảo mật?</p>
                    <p className="mt-2 text-sm text-white/80">
                      Đội ngũ chuyên gia SecureOps sẵn sàng đồng hành cùng doanh nghiệp của bạn.
                    </p>
                  </div>
                  <div className="mt-6 flex flex-col gap-2">
                    <Link
                      href={vi.routes.contact}
                      className="rounded-[var(--radius-brand)] bg-white px-4 py-2.5 text-center text-sm font-semibold text-primary"
                    >
                      {CTA.primary}
                    </Link>
                    <Link
                      href={vi.routes.products}
                      className="rounded-[var(--radius-brand)] border border-white/40 px-4 py-2.5 text-center text-sm font-semibold text-white"
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
}: {
  title: string
  viewAllHref: string
  groups: MegaMenuData['productGroups']
  accent: 'primary' | 'accent'
}) {
  return (
    <div className="col-span-4 lg:col-span-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate">{title}</h3>
        <Link
          href={viewAllHref}
          className={cn(
            'text-xs font-semibold',
            accent === 'primary' ? 'text-primary' : 'text-accent',
          )}
        >
          {vi.cta.viewAll}
        </Link>
      </div>
      {groups.length === 0 ? (
        <p className="text-sm text-slate">Đang cập nhật nội dung.</p>
      ) : (
        <div className="grid max-h-80 grid-cols-1 gap-x-6 gap-y-4 overflow-y-auto pr-2">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 text-xs font-semibold text-ink">{group.label}</p>
              <ul className="space-y-1">
                {group.links.slice(0, 6).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded px-1 py-0.5 text-sm text-slate transition-colors hover:text-primary"
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
