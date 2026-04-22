import type { HeadingBlock } from '@/lib/types/articles';
import InlineMarkdown from '@/components/inline-markdown';

export default function HeadingBlockComponent({ text, level }: HeadingBlock) {
  return (
    level === 2
      ? <h2><InlineMarkdown text={text} /></h2>
      : <h3><InlineMarkdown text={text} /></h3>
  );
}