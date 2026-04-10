# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Coding Conventions

## ESLint

- Single quotes for all strings.
- Semicolons at the end of every statement.

## File Naming

- Components: kebab-case (`article-card.tsx`, `breaking-news-banner.tsx`).
- Utilities and API files: kebab-case (`articles.ts`, `breaking-news.ts`).
- Type files: kebab-case (`articles.ts`, `api.ts`).

## Styling

- Use daisyUI components and classes wherever possible.
- Fall back to Tailwind CSS v4 utility classes when daisyUI doesn't cover the need.
- No CSS modules or inline styles.
