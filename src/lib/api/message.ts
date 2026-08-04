export type Message = {
  id: number;
  content: string;
  username: string;
  createdAt: string;
};

type MessageListResponse = {
  code: number;
  data: Message[];
};

export async function fetchMessages(): Promise<MessageListResponse> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const raw = localStorage.getItem("messages");
  const list: Message[] = raw ? JSON.parse(raw) : [];
  return JSON.parse(
    JSON.stringify({ code: 0, data: list }),
  ) as MessageListResponse;
}
