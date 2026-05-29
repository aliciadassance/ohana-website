import { PrismicNextImage } from '@prismicio/next'
import type { SliceComponentProps } from '@prismicio/react'
import type { ImageField } from '@prismicio/client'

type ImageSlice = {
  id: string
  slice_type: string
  slice_label: null
  variation: string
  version: string
  primary: { image: ImageField; caption: string | null; size: 'full' | 'narrow' }
  items: Record<string, never>[]
}

const Image = ({ slice }: SliceComponentProps<ImageSlice>) => {
  const isNarrow = slice.primary.size === 'narrow'
  return (
    <figure className={`blog-slice blog-slice--image${isNarrow ? ' blog-slice--image-narrow' : ''}`}>
      <PrismicNextImage
        field={slice.primary.image}
        className="blog-slice__img"
        sizes="(max-width: 768px) 100vw, 860px"
      />
      {slice.primary.caption && (
        <figcaption className="blog-slice__caption">{slice.primary.caption}</figcaption>
      )}
    </figure>
  )
}

export default Image
