import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import type { Product } from '@/payload-types'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-brand-lg)] border border-border-soft bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[var(--shadow-glow)]"
    >
      {/* Top accent bar reveals on hover */}
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-primary-light transition-transform duration-300 group-hover:scale-x-100" />
      <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        <ShieldCheck className="h-6 w-6" />
      </span>
      <h3 className="text-lg font-bold text-ink transition-colors group-hover:text-primary">
        {product.name}
      </h3>
      {product.shortDescription && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate">
          {product.shortDescription}
        </p>
      )}
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
        Tìm hiểu thêm
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
