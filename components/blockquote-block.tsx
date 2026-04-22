import type { BlockquoteBlock } from '@/lib/types/articles';
import InlineMarkdown from '@/components/inline-markdown';

export default function BlockquoteComponent({ text }: BlockquoteBlock) {
  return (
    <blockquote><InlineMarkdown text={text} /></blockquote>
  );
}