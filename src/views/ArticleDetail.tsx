import { toast } from "sonner";
import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { logger, metrics } from "@/lib/sentry";
import { articles } from "@/lib/mock";
import { shareArticle } from "@/lib/api/article";

export default function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === Number(id));

  function handleLike(like: 0 | 1) {
    if (!article) {
      return;
    }
    const stats = JSON.parse(localStorage.getItem("article-stats")!) as Record<
      string,
      { like: number; dislike: number }
    >;
    const counter = stats[article.id];
    counter[like ? "like" : "dislike"] += 1;
    localStorage.setItem("article-stats", JSON.stringify(stats));
    toast.success(like ? "点赞" : "点踩");
    metrics.count("article.detail.like", 1, {
      attributes: { articleId: article.id, like },
    });
  }

  async function handleShare() {
    if (!article) {
      return;
    }
    await shareArticle(article.id);
    toast.success("分享链接已复制到剪贴板");
  }

  useEffect(() => {
    logger.info("进入 ArticleDetail 页面");
    if (article) {
      metrics.count("article.detail.view", 1, {
        attributes: { articleId: article.id },
      });
    }
    const deepReadTimer = setTimeout(() => {
      if (!article) return;
      metrics.count("article.detail.deep_read", 1, {
        attributes: { articleId: article.id },
      });
      const history = JSON.parse(
        localStorage.getItem("read-history")!,
      ) as number[];
      history.push(article.id);
      localStorage.setItem("read-history", JSON.stringify(history));
    }, 5000);
    return () => {
      clearTimeout(deepReadTimer);
      logger.info("离开 ArticleDetail 页面");
    };
  }, []);

  if (!article) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">文章未找到</h1>
        <Link to="/articles" className="text-blue-600 hover:underline">
          ← 返回文章列表
        </Link>
      </div>
    );
  }

  const related = articles.filter(
    (a) =>
      a.id !== article.id && a.tags.some((tag) => article.tags.includes(tag)),
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link
        to="/articles"
        className="mb-6 inline-block text-sm text-blue-600 hover:underline"
      >
        ← 返回文章列表
      </Link>

      <article className="rounded-xl bg-white p-8 shadow-sm">
        <header className="mb-6 border-b border-gray-100 pb-6">
          <h1 className="mb-3 text-2xl font-bold">{article.title}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>{article.author}</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <div className="flex gap-1.5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleLike(1)}
                className="cursor-pointer rounded-full p-1.5 text-sm transition-all duration-200 hover:scale-110 hover:bg-blue-50 hover:text-blue-600"
              >
                👍
              </button>
              <button
                onClick={() => handleLike(0)}
                className="cursor-pointer rounded-full p-1.5 text-sm transition-all duration-200 hover:scale-110 hover:bg-red-50 hover:text-red-600"
              >
                👎
              </button>
              <button
                onClick={() => handleShare()}
                className="cursor-pointer rounded-full p-1.5 text-sm transition-all duration-200 hover:scale-110 hover:bg-green-50 hover:text-green-600"
              >
                Share
              </button>
            </div>
          </div>
        </header>

        <div className="prose prose-sm max-w-none">
          {article.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={i} className="mt-8 mb-3 text-lg font-semibold">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("```")) {
              const lines = paragraph.split("\n");
              const code = lines.slice(1, -1).join("\n");
              return (
                <pre
                  key={i}
                  className="my-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"
                >
                  <code>{code}</code>
                </pre>
              );
            }
            return (
              <p key={i} className="mb-4 leading-relaxed text-gray-600">
                {paragraph}
              </p>
            );
          })}
        </div>

        <section className="mt-8 border-t border-gray-100 pt-6">
          <h2 className="mb-3 text-lg font-semibold">相关文章</h2>
          <Link
            to={`/articles/${related[0].id}`}
            className="block rounded-lg bg-gray-50 p-4 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
          >
            {related[0].title}
          </Link>
        </section>
      </article>
    </div>
  );
}
