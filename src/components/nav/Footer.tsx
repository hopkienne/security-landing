import Link from 'next/link'
import { Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import { BRAND } from '@/brand/tokens'
import { vi } from '@/dictionaries/vi'
import { Container } from '@/components/ui/Container'
import { Logo } from './Logo'

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: vi.nav.products,
    links: [
      { label: 'Tất cả sản phẩm', href: vi.routes.products },
      { label: vi.nav.solutions, href: vi.routes.solutions },
    ],
  },
  {
    title: 'Công ty',
    links: [
      { label: vi.nav.about, href: vi.routes.about },
      { label: vi.nav.customers, href: vi.routes.customers },
      { label: vi.nav.careers, href: vi.routes.careers },
    ],
  },
  {
    title: 'Tài nguyên',
    links: [
      { label: vi.nav.news, href: vi.routes.news },
      { label: vi.nav.contact, href: vi.routes.contact },
    ],
  },
  {
    title: 'Pháp lý',
    links: [
      { label: 'Chính sách bảo mật', href: vi.routes.privacy },
      { label: 'Điều khoản sử dụng', href: vi.routes.terms },
      { label: 'Cookie policy', href: vi.routes.cookies },
    ],
  },
]

const SOCIAL = [
  { icon: Linkedin, href: BRAND.social.linkedin, label: 'LinkedIn' },
  { icon: Facebook, href: BRAND.social.facebook, label: 'Facebook' },
  { icon: Youtube, href: BRAND.social.youtube, label: 'YouTube' },
]

export function Footer() {
  const year = 2026
  return (
    <footer className="relative mt-24 overflow-hidden bg-navy text-white">
      <div className="bg-dotgrid absolute inset-0 opacity-30" aria-hidden />
      <Container className="relative py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <Logo tone="dark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {BRAND.positioning}
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-white/70">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary-light" /> {BRAND.phone}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary-light" /> {BRAND.email}
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" /> {BRAND.address}
              </li>
            </ul>
            <div className="mt-6 flex gap-2.5">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white/50">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 text-sm text-white/55 sm:flex-row">
          <p>
            © {year} {BRAND.legalName}. Bảo lưu mọi quyền.
          </p>
          <p>{BRAND.tagline}</p>
        </div>
      </Container>
    </footer>
  )
}
