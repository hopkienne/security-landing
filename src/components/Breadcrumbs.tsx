import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'

export type Crumb = { name: string; href: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border-soft bg-bg-soft">
      <Container className="py-3">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-slate">
          <li>
            <Link href="/" className="hover:text-primary">
              Trang chủ
            </Link>
          </li>
          {items.map((item, i) => {
            const last = i === items.length - 1
            return (
              <li key={item.href} className="flex items-center gap-1">
                <ChevronRight className="h-4 w-4 text-slate/50" />
                {last ? (
                  <span className="font-medium text-ink">{item.name}</span>
                ) : (
                  <Link href={item.href} className="hover:text-primary">
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </Container>
    </nav>
  )
}
