import type { Article } from '@/lib/types/articles';
import ArticleCard from '@/components/article-card';

const colClasses: Record<3 | 4, string> = {
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

type ArticleGridProps = {
  articles: Article[];
  title?: string;
  columns?: 3 | 4;
  className?: string;
};

export default function ArticleGrid({ articles, title, columns = 3, className }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <section className={className}>
        {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
        <p className="text-base-content/60">No articles found.</p>
      </section>
    );
  }

  return (
    <section className={`w-full py-10 ${className ?? ''}`}>
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className={`grid ${colClasses[columns]} gap-6`}>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
