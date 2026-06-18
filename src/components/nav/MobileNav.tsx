'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ChevronDown, X } from 'lucide-react'
import type { MegaMenuData, MegaMenuSection } from './nav-data'
import { vi } from '@/dictionaries/vi'
import { BRAND } from '@/brand/tokens'
import { cn } from '@/lib/utils'
import { ShieldMark } from './Logo'

const PLAIN_LINKS = [
  { label: vi.nav.about, href: vi.routes.about },
  { label: vi.nav.customers, href: vi.routes.customers },
  { label: vi.nav.news, href: vi.routes.news },
  { label: vi.nav.careers, href: vi.routes.careers },
  { label: vi.nav.contact, href: vi.routes.contact },
]

export function MobileNav({
  open,
  onClose,
  menu,
}: {
  open: boolean
  onClose: () => void
  menu: MegaMenuData
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/40 xl:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl xl:hidden"
            role="dialog"
            aria-label="Menu di động"
          >
            <div className="flex items-center justify-between border-b border-border-soft px-4 py-4">
              <span className="flex items-center gap-2 text-lg font-extrabold text-ink">
                <ShieldMark className="h-8 w-8" />
                {BRAND.logoText}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              {menu.sections.map((section) => (
                <Accordion key={section.key} section={section} onNavigate={onClose} />
              ))}
              <nav className="mt-2 flex flex-col">
                {PLAIN_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="border-b border-border-soft py-3 text-base font-medium text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function Accordion({
  section,
  onNavigate,
}: {
  section: MegaMenuSection
  onNavigate: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border-soft">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 py-3 text-left text-base font-medium text-ink"
        aria-expanded={open}
      >
        <span>{section.label}</span>
        <ChevronDown className={cn('h-5 w-5 shrink-0 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-2">
              <p className="mb-3 text-sm leading-6 text-slate">{section.description}</p>
              <Link
                href={section.overviewHref}
                onClick={onNavigate}
                className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-primary"
              >
                {vi.cta.overview}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              {section.groups.length === 0 ? (
                <p className="py-2 text-sm text-slate">Đang cập nhật.</p>
              ) : (
                section.groups.map((group) => (
                  <div key={group.label} className="mb-3">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate">
                      {group.label}
                    </p>
                    <ul className="space-y-1">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={onNavigate}
                            className="block py-1 pr-2 text-sm leading-6 text-slate"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
