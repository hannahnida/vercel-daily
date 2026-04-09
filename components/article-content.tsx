import type { ContentBlock } from "@/lib/types/articles";
import BlockquoteComponent from '@/components/blockquote-block';
import HeadingBlockComponent from '@/components/heading-block';
import ImageBlockComponent from '@/components/image-block';
import ListBlockComponent from '@/components/list-block';
import ParagraphBlockComponent from '@/components/paragraph-block';

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case 'paragraph':
      return <ParagraphBlockComponent key={block.type + i} {...block} />
    case 'heading':
      return <HeadingBlockComponent key={block.type + i} {...block} />
    case 'blockquote':
      return <BlockquoteComponent key={block.type + i} {...block} />
    case 'unordered-list':
    case 'ordered-list':
      return <ListBlockComponent key={block.type + i} {...block} />
    case 'image':
      return <ImageBlockComponent key={block.type + i} {...block} />
    default:
      const exhausted: never = block;
      throw new Error(`Unhandled block type: ${exhausted}`);
  }
}

export default function ArticleContent({ content }: { content: ContentBlock[] }) {
  return (
    <article>
      {content.map(renderBlock)}
    </article>
  )
}