import { use } from 'react';
import type { Article } from "@/lib/types/articles";


type ArticleListProps = {
  articlesPromise: Promise<Article[]>;
}

export async function ArticleList({
  articlesPromise
}: {
  articlesPromise: Promise<Article[] | null>
}) {
  const articles = await articlesPromise;

  if (!articles) return <p>No articles found.</p>;

  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>{article.title} <b>{article.featured && 'isFeatured'}</b></li>
      ))}
    </ul>
  );
}