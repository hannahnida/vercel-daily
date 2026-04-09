import { ParagraphBlock } from '@/lib/api/articles'

export default function ParagraphBlockComponent({ text }: ParagraphBlock) {
  return (
    <p>{text}</p>
  )
}