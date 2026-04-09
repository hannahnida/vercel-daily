import { BlockquoteBlock } from '@/lib/api/articles'

export default function BlockquoteComponent({ text }: BlockquoteBlock) {
  return (
    <blockquote>{text}</blockquote>
  )
}