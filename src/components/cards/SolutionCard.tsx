import Link from 'next/link'
import { ArrowRight, Radar } from 'lucide-react'
import type { Solution } from '@/payload-types'

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <Link
      href={`/giai-phap/${solution.slug}`}
      className="group relative flex flex-col rounded-[var(--radius-brand-lg)] border border-border-soft bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_12px_40px_-12px_rgba(37,99,235,0.3)]"
    >
      <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-brand)] bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
        <Radar className="h-5 w-5" />
      </span>
      <h3 className="text-lg font-semibold text-ink group-hover:text-accent">{solution.name}</h3>
      {solution.shortDescription && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate">
          {solution.shortDescription}
        </p>
      )}
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
        Xem giải pháp
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
