import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { CaseStudy } from '@/payload-types'
import { mediaUrl, mediaAlt } from '@/lib/utils'

export function CaseStudyCard({ item }: { item: CaseStudy }) {
  const cover = mediaUrl(item.coverImage, 'card') ?? '/secureops/case-study-cover.webp'
  const logo = mediaUrl(item.logo, 'thumbnail')
  return (
    <Link
      href={`/khach-hang-du-an/${item.slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-brand-lg)] border border-border-soft bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-bg-soft">
        <Image
          src={cover}
          alt={mediaAlt(item.coverImage, item.clientName)}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {item.industry && (
          <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {item.industry}
          </span>
        )}
        <div className="flex items-center gap-3">
          {logo && (
            <Image
              src={logo}
              alt={mediaAlt(item.logo, item.clientName)}
              width={40}
              height={40}
              className="h-8 w-auto object-contain"
            />
          )}
          <h3 className="text-lg font-semibold text-ink group-hover:text-primary">
            {item.clientName}
          </h3>
        </div>
        {item.summary && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate">{item.summary}</p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Xem chi tiết
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
