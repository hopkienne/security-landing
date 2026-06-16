import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BRAND } from '@/brand/tokens'

/**
 * SecureOps shield wordmark. `tone="dark"` renders white text for use on the
 * navy hero / footer; default renders ink text for light surfaces.
 */
export function Logo({
  tone = 'light',
  className,
}: {
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <Link
      href="/"
      aria-label={BRAND.logoText}
      className={cn('inline-flex items-center gap-2.5 font-extrabold', className)}
    >
      <ShieldMark />
      <span
        className={cn(
          'text-[1.35rem] leading-none tracking-tight',
          tone === 'dark' ? 'text-white' : 'text-ink',
        )}
      >
        {BRAND.logoText}
      </span>
    </Link>
  )
}

export function ShieldMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'relative inline-flex h-9 w-9 shrink-0 items-center justify-center',
        className,
      )}
    >
      <svg viewBox="0 0 32 32" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="so-shield" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00edff" />
            <stop offset="55%" stopColor="#2006f7" />
            <stop offset="100%" stopColor="#1a05c6" />
          </linearGradient>
        </defs>
        <path
          d="M16 1.5l11 4v8.2c0 7.6-4.7 13.2-11 16.8C9.7 26.9 5 21.3 5 13.7V5.5l11-4z"
          fill="url(#so-shield)"
        />
        <path
          d="M11 16.4l3.4 3.4L21.5 12"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
