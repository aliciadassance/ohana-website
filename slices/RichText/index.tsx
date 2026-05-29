import { PrismicRichText } from '@prismicio/react'
import type { SliceComponentProps } from '@prismicio/react'
import type { RichTextField } from '@prismicio/client'

type RichTextSliceType = {
  id: string
  slice_type: string
  slice_label: null
  variation: string
  version: string
  primary: { content: RichTextField }
  items: Record<string, never>[]
}

export default function RichTextSlice({ slice }: SliceComponentProps<RichTextSliceType>) {
  return (
    <section className="blog-slice blog-slice--rich-text">
      <div className="blog-prose">
        <PrismicRichText field={slice.primary.content} />
      </div>
    </section>
  )
}
