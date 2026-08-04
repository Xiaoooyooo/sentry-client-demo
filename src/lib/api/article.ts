import request from "./client";

type ShareResponse = {
  shareUrl: string;
};

export function shareArticle(articleId: number) {
  return request<ShareResponse>(`/api/articles/${articleId}/share`, {
    method: "post",
  });
}
