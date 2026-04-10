export type Author = {
  avatar: string;
  name: string;
}

export type ParagraphBlock = {
  type: 'paragraph';
  text: string;
}

export type HeadingBlock = {
  type: 'heading';
  level: 2 | 3;
  text: string;
}

export type BlockquoteBlock = {
  type: 'blockquote';
  text: string;
}

export type UnorderedListBlock = {
  type: 'unordered-list';
  items: string[];
}

export type OrderedListBlock = {
  type: 'ordered-list';
  items: string[];
}

export type ImageBlock = {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export type ContentBlock = ParagraphBlock | HeadingBlock | BlockquoteBlock | UnorderedListBlock | OrderedListBlock | ImageBlock;

export type Article = {
  author: Author;
  category: string;
  content: ContentBlock[];
  excerpt: string;
  featured: boolean;
  id: string;
  image: string;
  publishedAt: string;
  slug: string;
  tags: string[];
  title: string;
}
