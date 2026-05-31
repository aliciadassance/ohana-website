import { PrismicRichText } from '@prismicio/react'
import type { SliceComponentProps } from '@prismicio/react'
import type { RichTextField } from '@prismicio/client'

type QuoteCalloutSlice = {
  id: string
  slice_type: string
  slice_label: null
  variation: string
  version: string
  primary: { text: RichTextField; attribution: string | null; style: 'quote' | 'callout' }
  items: Record<string, never>[]
}

const QuoteCallout = ({ slice }: SliceComponentProps<QuoteCalloutSlice>) => {
  const isQuote = slice.primary.style !== 'callout'
  return (
    <aside className={`blog-slice blog-slice--${slice.primary.style ?? 'quote'}`}>
      {isQuote && <span className="blog-quote__mark" aria-hidden="true">&ldquo;</span>}
      <div className="blog-quote__text">
        <PrismicRichText field={slice.primary.text} />
      </div>
      {slice.primary.attribution && (
        <cite className="blog-quote__attribution">{slice.primary.attribution}</cite>
      )}
    </aside>
  )
}

export default QuoteCallout
