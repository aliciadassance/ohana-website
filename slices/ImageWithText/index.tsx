import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'
import type { SliceComponentProps } from '@prismicio/react'
import { isFilled } from '@prismicio/client'
import type { RichTextField, ImageField, KeyTextField, SelectField } from '@prismicio/client'

type ImageWithTextSlice = {
  id: string
  slice_type: string
  slice_label: null
  variation: string
  version: string
  primary: {
    image: ImageField<never>
    caption: KeyTextField
    image_position: SelectField<'left' | 'right', 'filled'>
    mobile_image_position: SelectField<'top' | 'bottom', 'filled'>
    title: KeyTextField
    content: RichTextField
  }
  items: Record<string, never>[]
}

const ImageWithText = ({ slice }: SliceComponentProps<ImageWithTextSlice>) => {
  const desktopPos = slice.primary.image_position ?? 'left'
  const mobilePos = slice.primary.mobile_image_position ?? 'top'

  return (
    <section
      className={`blog-slice blog-slice--image-with-text desktop-${desktopPos} mobile-${mobilePos}`}
    >
      <div className="image-with-text__img">
        <PrismicNextImage field={slice.primary.image} className="image-with-text__img-el" />
        {isFilled.keyText(slice.primary.caption) && (
          <p className="blog-slice__caption">{slice.primary.caption}</p>
        )}
      </div>
      <div className="image-with-text__text">
        {isFilled.keyText(slice.primary.title) && (
          <h2 className="image-with-text__title">{slice.primary.title}</h2>
        )}
        <div className="blog-prose">
          <PrismicRichText field={slice.primary.content} />
        </div>
      </div>
    </section>
  )
}

export default ImageWithText
