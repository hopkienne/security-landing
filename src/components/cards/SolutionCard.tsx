import Link from 'next/link'
import { ArrowRight, Radar } from 'lucide-react'
import type { Solution } from '@/payload-types'

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <Link
      href={`/giai-phap/${solution.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-brand-lg)] border border-border-soft bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-sky/50 hover:shadow-[0_24px_60px_-18px_rgba(0,156,251,0.4)]"
    >
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-cyan to-primary transition-transform duration-300 group-hover:scale-x-100" />
      <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky/10 text-sky transition-all group-hover:bg-gradient-to-br group-hover:from-cyan group-hover:to-primary group-hover:text-white">
        <Radar className="h-6 w-6" />
      </span>
      <h3 className="text-lg font-bold text-ink transition-colors group-hover:text-primary">
        {solution.name}
      </h3>
      {solution.shortDescription && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate">
          {solution.shortDescription}
        </p>
      )}
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-sky">
        Xem giải pháp
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
