import type { UnorderedListBlock, OrderedListBlock } from "@/lib/types/articles";

export default function ListBlockComponent({ items, type }: UnorderedListBlock | OrderedListBlock) {
  const Tag = type === 'unordered-list' ? 'ul' : 'ol';

  return (
    <Tag>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </Tag>
  )
}