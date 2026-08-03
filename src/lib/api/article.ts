import request from "./client";
import { articles } from "@/lib/mock";

type ShareResponse = {
  code: number;
  message?: string;
};

export async function shareArticle(articleId: number) {
  const article = articles.find((a) => a.id === articleId);
  if (!article) {
    throw new Error(`文章 ${articleId} 不存在`);
  }

  const shareUrl = `${window.location.origin}/articles/${articleId}`;
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(shareUrl);
  }

  let res: ShareResponse;
  try {
    res = await request<ShareResponse>(`/api/articles/${articleId}/share`, {
      method: "post",
      data: { url: shareUrl },
    });
  } catch (error) {
    throw new Error("分享失败：无法连接分享服务", { cause: error });
  }

  if (res.code !== 0) {
    throw new Error(`分享失败：${res.message ?? "服务返回状态异常"}`);
  }
}
