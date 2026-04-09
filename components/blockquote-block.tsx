import type { BlockquoteBlock } from "@/lib/types/articles";

export default function BlockquoteComponent({ text }: BlockquoteBlock) {
  return (
    <blockquote>{text}</blockquote>
  )
}