import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-[var(--radius-brand)] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md hover:-translate-y-0.5',
  secondary:
    'bg-white text-ink border border-border-soft hover:border-primary hover:text-primary',
  ghost: 'text-ink hover:text-primary',
}

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  disabled,
  onClick,
}: CommonProps & {
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}) {
  const classes = cn(base, variants[variant], sizes[size], className)
  if (href) {
    const external = href.startsWith('http')
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
