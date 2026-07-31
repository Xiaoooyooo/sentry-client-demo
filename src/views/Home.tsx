import { Link } from "react-router";
import { articles, profile } from "@/lib/mock";
import { useEffect } from "react";
import { logger } from "@/lib/sentry";

export default function Home() {
  const latestArticles = articles.slice(0, 3);

  useEffect(() => {
    logger.info("进入 Home 页面", { now: new Date().toISOString() });
    return () => {
      logger.info("离开 Home 页面", { now: new Date().toISOString() });
    };
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Hero */}
      <section className="mb-12 rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-3 text-3xl font-bold">你好，我是 {profile.name}</h1>
        <p className="text-lg leading-relaxed text-gray-500">{profile.bio}</p>
        <div className="mt-4 flex gap-2">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">最新文章</h2>
          <Link
            to="/articles"
            className="text-sm text-blue-600 hover:underline"
          >
            查看全部 →
          </Link>
        </div>
        <div className="space-y-4">
          {latestArticles.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.id}`}
              className="block rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-medium">{article.title}</h3>
              <p className="mb-3 text-sm leading-relaxed text-gray-500">
                {article.summary}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>{article.author}</span>
                <span>·</span>
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.tags.join(", ")}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
