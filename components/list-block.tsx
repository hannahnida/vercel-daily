import type { UnorderedListBlock, OrderedListBlock } from '@/lib/types/articles';
import InlineMarkdown from '@/components/inline-markdown';

export default function ListBlockComponent({ items, type }: UnorderedListBlock | OrderedListBlock) {
  const Tag = type === 'unordered-list' ? 'ul' : 'ol';

  return (
    <Tag>
      {items.map((item, i) => (
        <li key={i}>
          <InlineMarkdown text={item} />
        </li>
      ))}
    </Tag>
  );
}