import Image from 'next/image'
import { ImageBlock } from '@/lib/api/articles'

export default function ImageBlockComponent({ src, alt, caption }: ImageBlock) {
  return (
    <figure>
      <Image src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}