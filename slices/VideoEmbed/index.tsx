import type { SliceComponentProps } from '@prismicio/react'
import type { EmbedField } from '@prismicio/client'

type VideoEmbedSlice = {
  id: string
  slice_type: string
  slice_label: null
  variation: string
  version: string
  primary: { embed: EmbedField; caption: string | null }
  items: Record<string, never>[]
}

const VideoEmbed = ({ slice }: SliceComponentProps<VideoEmbedSlice>) => {
  const html = (slice.primary.embed as { html?: string })?.html
  if (!html) return null
  return (
    <figure className="blog-slice blog-slice--video">
      <div
        className="blog-slice__video-wrap"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {slice.primary.caption && (
        <figcaption className="blog-slice__caption">{slice.primary.caption}</figcaption>
      )}
    </figure>
  )
}

export default VideoEmbed
