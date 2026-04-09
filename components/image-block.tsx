import Image from 'next/image'
import type { ImageBlock } from "@/lib/types/articles";

export default function ImageBlockComponent({ src, alt, caption }: ImageBlock) {
  return (
    <figure>
      <Image src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}