import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/payload-types'
import { mediaUrl, mediaAlt, formatDateVi } from '@/lib/utils'

export function BlogCard({ post }: { post: Post }) {
  const cover = mediaUrl(post.coverImage, 'card') ?? '/secureops/blog-cover-default.webp'
  const category = typeof post.category === 'object' && post.category ? post.category.name : null
  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-brand-lg)] border border-border-soft bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[var(--shadow-glow)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-bg-soft">
        <Image
          src={cover}
          alt={mediaAlt(post.coverImage, post.title)}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-xs text-slate">
          {category && <span className="font-semibold text-primary">{category}</span>}
          {post.publishedAt && <span>· {formatDateVi(post.publishedAt)}</span>}
        </div>
        <h3 className="text-lg font-bold text-ink transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate">{post.excerpt}</p>
        )}
      </div>
    </Link>
  )
}
