'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { AlertTriangle, ArrowRight, ChevronDown, Globe, Menu } from 'lucide-react'
import type { MegaMenuData, MegaMenuKey, MegaMenuSection } from './nav-data'
import { vi } from '@/dictionaries/vi'
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
  const [activeMega, setActiveMega] = useState<MegaMenuKey | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const hoverOpenedSection = useRef<MegaMenuKey | null>(null)
  const pathname = usePathname()

  const openMega = activeMega !== null
  const activeSection = menu.sections.find((section) => section.key === activeMega) ?? null

  // Only the home page has the dark video hero behind the header. There the
  // header overlays the video transparently with white text, then flips to the
  // solid white treatment once the user scrolls (or opens the mega menu).
  const isHome = pathname === '/'
  const overHero = isHome && !scrolled && !openMega

  const closeMega = () => {
    hoverOpenedSection.current = null
    setActiveMega(null)
  }

  const openSectionFromHover = (sectionKey: MegaMenuKey) => {
    setActiveMega((current) => {
      if (current !== sectionKey) {
        hoverOpenedSection.current = sectionKey
      }

      return sectionKey
    })
  }

  const toggleSectionFromClick = (sectionKey: MegaMenuKey) => {
    setActiveMega((current) => {
      if (hoverOpenedSection.current === sectionKey) {
        hoverOpenedSection.current = null
        return sectionKey
      }

      return current === sectionKey ? null : sectionKey
    })
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMega()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full" onMouseLeave={closeMega}>
      {/* Utility bar */}
      <div
        className={cn(
          'hidden transition-colors duration-300 lg:block',
          overHero ? 'bg-transparent' : 'bg-white',
        )}
      >
        <div className="mx-auto flex h-9 w-full max-w-7xl items-center justify-end gap-5 px-4 text-[13px] sm:px-6 lg:px-8">
          <Link
            href={vi.routes.contact}
            className={cn(
              'inline-flex items-center gap-1.5 font-medium transition-colors',
              overHero ? 'text-white/85 hover:text-white' : 'text-slate hover:text-primary',
            )}
          >
            <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
            Đang bị tấn công mạng? Phản ứng khẩn cấp 24/7
          </Link>
          <button
            type="button"
            className={cn(
              'inline-flex items-center gap-1.5 transition-colors',
              overHero ? 'text-white/80 hover:text-white' : 'text-slate hover:text-primary',
            )}
            aria-label="Chọn ngôn ngữ"
          >
            <Globe className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={cn(
          'w-full border-b transition-all duration-300',
          overHero
            ? 'border-transparent bg-transparent'
            : scrolled || openMega
              ? 'border-border-soft bg-white shadow-[0_4px_24px_-12px_rgba(10,27,61,0.18)]'
              : 'border-transparent bg-white/85 backdrop-blur',
        )}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo tone={overHero ? 'dark' : 'light'} />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Điều hướng chính">
            {menu.sections.map((section) => {
              const active = activeMega === section.key

              return (
                <button
                  key={section.key}
                  type="button"
                  className={cn(
                    'inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-[15px] font-semibold transition-colors',
                    overHero ? 'text-white/90 hover:text-white' : 'text-ink hover:text-primary',
                    active && 'text-primary',
                  )}
                  onMouseEnter={() => openSectionFromHover(section.key)}
                  onClick={() => toggleSectionFromClick(section.key)}
                  aria-expanded={active}
                  aria-controls="secureops-mega-menu"
                >
                  {section.label}
                  <ChevronDown
                    className={cn('h-4 w-4 transition-transform', active && 'rotate-180')}
                  />
                </button>
              )
            })}
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-2 text-[15px] font-medium transition-colors',
                  overHero ? 'text-white/90 hover:text-white' : 'text-ink hover:text-primary',
                )}
                onMouseEnter={closeMega}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-md xl:hidden',
                overHero ? 'text-white' : 'text-ink',
              )}
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
        {activeSection && (
          <motion.div
            key={activeSection.key}
            id="secureops-mega-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute inset-x-0 top-full hidden border-b border-border-soft bg-white shadow-xl xl:block"
            onMouseEnter={() => openSectionFromHover(activeSection.key)}
          >
            <MegaPanel section={activeSection} onNavigate={closeMega} />
          </motion.div>
        )}
      </AnimatePresence>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} menu={menu} />
    </header>
  )
}

function MegaPanel({
  section,
  onNavigate,
}: {
  section: MegaMenuSection
  onNavigate: () => void
}) {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-12 gap-8 px-8 py-8">
      <div className="col-span-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate">
          {section.eyebrow}
        </p>
        <h3 className="mt-3 text-xl font-extrabold leading-tight text-ink">{section.heading}</h3>
        <p className="mt-3 text-sm leading-6 text-slate">{section.description}</p>
        <Link
          href={section.overviewHref}
          onClick={onNavigate}
          className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary transition-colors hover:text-primary-dark"
        >
          {vi.cta.overview}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="col-span-6">
        {section.groups.length === 0 ? (
          <p className="rounded-md bg-bg-soft px-4 py-3 text-sm text-slate">
            Đang cập nhật nội dung.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {section.groups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.1em] text-ink">
                  {group.label}
                </p>
                <ul className="space-y-1">
                  {group.links.slice(0, 5).map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onNavigate}
                        className="block rounded px-2 py-1.5 text-sm leading-5 text-slate transition-colors hover:bg-bg-soft hover:text-primary"
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

      <div className="col-span-3">
        <MegaCtaCard section={section} onNavigate={onNavigate} />
      </div>
    </div>
  )
}

function MegaCtaCard({
  section,
  onNavigate,
}: {
  section: MegaMenuSection
  onNavigate: () => void
}) {
  return (
    <div className="relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-[var(--radius-brand-lg)] bg-navy text-white">
      <div className="bg-dotgrid absolute inset-0 opacity-50" aria-hidden />
      <div className="relative h-32 overflow-hidden">
        <Image
          src={section.cta.imageSrc}
          alt={section.cta.imageAlt}
          fill
          sizes="280px"
          className="object-cover opacity-90"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy/5 via-navy/20 to-navy"
          aria-hidden
        />
      </div>
      <div className="relative px-6 pt-4">
        <p className="text-lg font-bold leading-tight">{section.cta.heading}</p>
        <p className="mt-2 text-sm leading-6 text-white/75">{section.cta.body}</p>
      </div>
      <div className="relative mt-5 flex flex-col gap-2 px-6 pb-6">
        <Link
          href={section.cta.primary.href}
          onClick={onNavigate}
          className="rounded-full bg-primary px-4 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-primary-dark"
        >
          {section.cta.primary.label}
        </Link>
        {section.cta.secondary && (
          <Link
            href={section.cta.secondary.href}
            onClick={onNavigate}
            className="rounded-full border border-white/30 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {section.cta.secondary.label}
          </Link>
        )}
      </div>
    </div>
  )
}
