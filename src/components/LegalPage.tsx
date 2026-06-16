import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export function LegalPage({
  title,
  href,
  children,
}: {
  title: string
  href: string
  children: ReactNode
}) {
  return (
    <>
      <Breadcrumbs items={[{ name: title, href }]} />
      <section className="py-12">
        <Container className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-ink">{title}</h1>
          <div className="prose-content mt-8">{children}</div>
        </Container>
      </section>
    </>
  )
}
