import type { ReactNode } from 'react';

const INLINE_RE =
  /\[([^\]]+)\]\(([^\s)]+)\)|`([^`]+)`|\*\*(.+?)\*\*/g;

export default function InlineMarkdown({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_RE)) {
    // Push any plain text before this match
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const [, linkText, linkHref, code, bold] = match;

    if (linkText && linkHref) {
      const isExternal = /^https?:\/\//.test(linkHref);
      nodes.push(
        <a
          key={match.index}
          href={linkHref}
          {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {linkText}
        </a>,
      );
    } else if (code) {
      nodes.push(<code key={match.index}>{code}</code>);
    } else if (bold) {
      nodes.push(<strong key={match.index}>{bold}</strong>);
    }

    lastIndex = match.index + match[0].length;
  }

  // Push remaining plain text
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes}</>;
}

