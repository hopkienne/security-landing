import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { cn } from '@/lib/utils'

type Props = {
  data?: { root: unknown } | null
  className?: string
}

/** Renders Payload Lexical rich text. No-op when empty. */
export function RichText({ data, className }: Props) {
  if (!data) return null
  return (
    <div className={cn('prose-content', className)}>
      <LexicalRichText data={data as unknown as SerializedEditorState} />
    </div>
  )
}
