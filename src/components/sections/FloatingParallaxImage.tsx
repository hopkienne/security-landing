'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

type FloatingParallaxImageProps = {
  src: string
  alt: string
  className: string
  baseY: number
  rangeY: number
  floatY: number
  phase: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function FloatingParallaxImage({
  src,
  alt,
  className,
  baseY,
  rangeY,
  floatY,
  phase,
}: FloatingParallaxImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const section = wrapper?.closest('section')
    if (!wrapper || !section) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = (time = 0) => {
      if (reducedMotion.matches) {
        wrapper.style.transform = `translate3d(0, ${baseY}px, 0)`
        frame = window.requestAnimationFrame(update)
        return
      }

      const rect = section.getBoundingClientRect()
      const isNearViewport = rect.bottom > -160 && rect.top < window.innerHeight + 160

      if (!isNearViewport) {
        frame = window.requestAnimationFrame(update)
        return
      }

      const viewportCenter = window.innerHeight / 2
      const sectionCenter = rect.top + rect.height / 2
      const progress = clamp((viewportCenter - sectionCenter) / (rect.height / 2), -1, 1)
      const idleFloat = Math.sin(time / 950 + phase) * floatY
      wrapper.style.transform = `translate3d(0, ${baseY + progress * rangeY + idleFloat}px, 0)`
      frame = window.requestAnimationFrame(update)
    }

    frame = window.requestAnimationFrame(update)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [baseY, floatY, phase, rangeY])

  return (
    <div
      ref={wrapperRef}
      className={`absolute overflow-hidden rounded-md shadow-[0_24px_70px_-40px_rgba(8,1,45,0.45)] will-change-transform ${className}`}
      style={{ transform: `translate3d(0, ${baseY}px, 0)` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 250px, (min-width: 768px) 200px, 125px"
        className="object-cover"
      />
    </div>
  )
}
