import type { ParagraphBlock } from "@/lib/types/articles";
import InlineMarkdown from "@/components/inline-markdown";

export default function ParagraphBlockComponent({ text }: ParagraphBlock) {
  return (
    <p><InlineMarkdown text={text} /></p>
  )
}