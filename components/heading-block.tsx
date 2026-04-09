import type { HeadingBlock } from "@/lib/types/articles";

export default function HeadingBlockComponent({ text, level }: HeadingBlock) {
  return (
    level === 2
      ? <h2>{text}</h2>
      : <h3>{text}</h3>
  )
}