import { Paragraph } from '@/lib/api/articles'

export default function ParagraphBlock(props: Paragraph) {
  return (
    <p>{props.text}</p>
  )
}