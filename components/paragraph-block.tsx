import type { ParagraphBlock } from "@/lib/types/articles";

export default function ParagraphBlockComponent({ text }: ParagraphBlock) {
  return (
    <p>{text}</p>
  )
}