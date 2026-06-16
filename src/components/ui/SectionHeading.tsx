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
        <p
          className={cn(
            'mb-2.5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-primary',
            align === 'center' && 'justify-center',
          )}
        >
          <span className="h-0.5 w-6 rounded-full bg-gradient-to-r from-cyan to-primary" aria-hidden />
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          'font-extrabold tracking-tight text-ink',
          Tag === 'h1' ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl',
        )}
      >
        {title}
      </Tag>
      {subtitle && <p className="mt-4 text-lg leading-relaxed text-slate">{subtitle}</p>}
    </div>
  )
}
