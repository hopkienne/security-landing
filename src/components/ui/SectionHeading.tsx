import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  as: Tag = 'h2',
  className,
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          'font-bold tracking-tight text-ink',
          Tag === 'h1' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl',
        )}
      >
        {title}
      </Tag>
      {subtitle && <p className="mt-4 text-lg leading-relaxed text-slate">{subtitle}</p>}
    </div>
  )
}
