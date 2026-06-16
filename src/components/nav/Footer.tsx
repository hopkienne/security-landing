import Link from 'next/link'
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react'
import { BRAND } from '@/brand/tokens'
import { vi } from '@/dictionaries/vi'
import { Container } from '@/components/ui/Container'

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

export function Footer() {
  const year = 2026
  return (
    <footer className="mt-24 border-t border-border-soft bg-bg-soft">
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-ink">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-brand)] bg-primary text-white">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span className="text-xl">{BRAND.logoText}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate">{BRAND.positioning}</p>
            <ul className="mt-5 space-y-2 text-sm text-slate">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> {BRAND.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> {BRAND.email}
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {BRAND.address}
              </li>
            </ul>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold text-ink">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border-soft pt-6 text-sm text-slate sm:flex-row">
          <p>
            © {year} {BRAND.legalName}. Bảo lưu mọi quyền.
          </p>
          <p>{BRAND.tagline}</p>
        </div>
      </Container>
    </footer>
  )
}
