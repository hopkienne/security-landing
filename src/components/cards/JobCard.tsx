import Link from 'next/link'
import { MapPin, Briefcase, ArrowRight } from 'lucide-react'
import type { Job } from '@/payload-types'

const WORK_TYPE_LABEL: Record<string, string> = {
  'full-time': 'Toàn thời gian',
  'part-time': 'Bán thời gian',
  contract: 'Hợp đồng',
  remote: 'Từ xa',
  hybrid: 'Hybrid',
}

export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/tuyen-dung/${job.slug}`}
      className="group flex flex-col rounded-[var(--radius-brand-lg)] border border-border-soft bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-ink group-hover:text-primary">{job.title}</h3>
        <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-slate transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate">
        {job.department && (
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="h-4 w-4" /> {job.department}
          </span>
        )}
        {job.location && (
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" /> {job.location}
          </span>
        )}
        {job.workType && (
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {WORK_TYPE_LABEL[job.workType] ?? job.workType}
          </span>
        )}
      </div>
      {job.summary && (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate">{job.summary}</p>
      )}
    </Link>
  )
}
