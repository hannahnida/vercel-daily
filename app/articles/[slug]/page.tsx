import type { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';
import { articlesApi } from '@/lib/api/articles';
import { notFound } from 'next/navigation';
import ArticleHeader from '@/components/article-header';
import ArticleContent from '@/components/article-content';
import TrendingArticles from '@/components/trending-articles';
import ArticleGridSkeleton from '@/components/article-grid-skeleton';
import Paywall from '@/components/article/paywall';
import ArticleBodySkeleton from '@/components/article-body-skeleton';


export async function generateStaticParams() {
  const articles = await articlesApi.getAllArticlesForStaticParams();
  if (!articles) return [];
  return articles.map((article) => ({
    slug: article.slug,
  }));
}


type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const article = await articlesApi.getArticleBySlug(slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      authors: article.author?.name ? [article.author.name] : undefined,
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await articlesApi.getArticleBySlug(slug);
  if (!article) notFound();


  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-xl mx-auto">
        <article className="max-w-3xl mx-auto prose">
          <ArticleHeader {...article} />

          <Suspense fallback={<ArticleBodySkeleton />}>
            <Paywall preview={<p className="px-4">{article.excerpt}</p>}>
              <ArticleContent content={article.content} />
            </Paywall>
          </Suspense>

        </article>
        <Suspense fallback={<ArticleGridSkeleton count={4} title="Trending Articles" columns={4} />}>
          <TrendingArticles excludedIds={[article.id]} />
        </Suspense>
      </div>
    </div>
  );
}
