import { articlesApi } from '@/lib/api/articles';

export default async function Home() {
  const articles = await articlesApi.getAll();
  if (!articles) {
    console.error('No articles found.');
    return;
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <ul>
          {articles.map((article) => (
            <li key={article.id}>{article.title}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
