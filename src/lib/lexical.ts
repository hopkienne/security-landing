/**
 * Build a minimal Lexical editor state from plain paragraphs (and optional
 * headings). Enough for seeding rich-text fields with editable content.
 */
type LexNode = Record<string, unknown>

function textNode(text: string): LexNode {
  return {
    type: 'text',
    detail: 0,
    format: 0,
    mode: 'normal',
    style: '',
    text,
    version: 1,
  }
}

function paragraph(text: string): LexNode {
  return {
    type: 'paragraph',
    children: [textNode(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
  }
}

function heading(text: string, tag: 'h2' | 'h3' = 'h2'): LexNode {
  return {
    type: 'heading',
    tag,
    children: [textNode(text)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

export type Block = string | { heading: string; level?: 'h2' | 'h3' }

/** Convert an array of blocks (strings = paragraphs) into a Lexical root. */
export function richText(blocks: Block[]) {
  const children = blocks.map((b) =>
    typeof b === 'string' ? paragraph(b) : heading(b.heading, b.level ?? 'h2'),
  )
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}
