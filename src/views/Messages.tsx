import { toast } from "sonner";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { logger } from "@/lib/sentry";
import { useUserStore } from "@/store/user";
import { fetchMessages, type Message } from "@/lib/api/message";

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const formEl = useRef<HTMLFormElement>(null);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    logger.info("进入 Messages 页面");
    (async () => {
      const response = await fetchMessages();
      setMessages(response.data.map((message) => message));
      setLoading(false);
    })();
    return () => {
      logger.info("离开 Messages 页面");
    };
  }, []);

  function handleSubmit(event: MouseEvent) {
    event.preventDefault();
    const formData = new FormData(formEl.current!);
    const content = (formData.get("content") as string).trim();
    if (!content) {
      return;
    }
    const message: Message = {
      id: Date.now(),
      content,
      username: user?.fullName ?? "匿名用户",
      createdAt: new Date().toISOString(),
    };
    const raw = localStorage.getItem("messages");
    const list: Message[] = raw ? JSON.parse(raw) : [];
    list.push(message);
    localStorage.setItem("messages", JSON.stringify(list));
    setMessages((prev) => [...prev, message]);
    formEl.current!.reset();
    toast.success("留言成功");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold">留言板</h1>

      <form ref={formEl} className="mb-8 rounded-xl bg-white p-6 shadow-sm">
        <textarea
          name="content"
          rows={3}
          placeholder="写下你想说的话…"
          className="mb-3 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            发表留言
          </button>
        </div>
      </form>

      {loading ? (
        <p className="py-10 text-center text-sm text-gray-400">加载中…</p>
      ) : (
        <div className="space-y-4">
          {messages.length === 0 && (
            <p className="py-10 text-center text-sm text-gray-400">
              还没有留言，来抢沙发吧～
            </p>
          )}
          {messages.map((message) => (
            <div key={message.id} className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
                <span className="font-medium text-gray-600">
                  {message.username}
                </span>
                <span>·</span>
                <span>{new Date(message.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                {message.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
