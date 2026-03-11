interface SrcSetImage {
  w: number
  src: string
}

export interface Image {
  id: number
  slug: string
  alt: string
  width: number
  height: number
  src: string
  srcset: SrcSetImage[]
}
