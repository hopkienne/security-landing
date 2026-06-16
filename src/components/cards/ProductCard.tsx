import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import type { Product } from '@/payload-types'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group relative flex flex-col rounded-[var(--radius-brand-lg)] border border-border-soft bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_40px_-12px_rgba(14,165,183,0.35)]"
    >
      <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-brand)] bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        <ShieldCheck className="h-5 w-5" />
      </span>
      <h3 className="text-lg font-semibold text-ink group-hover:text-primary">{product.name}</h3>
      {product.shortDescription && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate">
          {product.shortDescription}
        </p>
      )}
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        Tìm hiểu thêm
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
