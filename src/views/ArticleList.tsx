import { Link } from "react-router";
import { articles } from "@/lib/mock";
import { useEffect } from "react";
import { logger } from "@/lib/sentry";

export default function ArticleList() {
  useEffect(() => {
    logger.info("进入 ArticleList 页面");
    return () => {
      logger.info("离开 ArticleList 页面");
    };
  }, []);
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold">全部文章</h1>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/articles/${article.id}`}
            className="block rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="mb-2 text-lg font-medium">{article.title}</h2>
            <p className="mb-3 text-sm leading-relaxed text-gray-500">
              {article.summary}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{article.author}</span>
              <span>·</span>
              <span>{article.date}</span>
              <span>·</span>
              <div className="flex gap-1.5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
