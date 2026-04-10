import Image from 'next/image'
import type { ImageBlock } from "@/lib/types/articles";

export default function ImageBlockComponent({ src, alt, caption }: ImageBlock) {
  return (
    <figure className="my-8 space-y-3">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-base-300 bg-base-200 shadow-sm">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 56rem, (min-width: 1024px) 48rem, 100vw"
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm leading-6 text-base-content/60">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}