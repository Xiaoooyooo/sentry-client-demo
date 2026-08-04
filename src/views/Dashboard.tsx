import { useEffect, useState } from "react";
import { logger } from "@/lib/sentry";

type Point = {
  value: number;
  ts: number;
};

function prefetchPoints(count = 5): Point[] {
  return Array.from({ length: count }, (_, i) => ({
    value: 20 + Math.floor(Math.random() * 80),
    ts: Date.now() - (count - i) * 2000,
  }));
}

export default function Dashboard() {
  const [points, setPoints] = useState<number[]>(() =>
    prefetchPoints().map((point) => point.value),
  );

  useEffect(() => {
    logger.info("进入 Dashboard 页面");
    let cursor = 0;
    const buffer = prefetchPoints();
    const timer = setInterval(() => {
      const point = buffer[cursor].value;
      cursor += 1;
      setPoints((prev) => [...prev.slice(-11), point]);
    }, 2000);
    return () => {
      clearInterval(timer);
      logger.info("离开 Dashboard 页面");
    };
  }, []);

  const total = points.reduce((sum, value) => sum + value, 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold">数据看板</h1>

      <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
        <p className="mb-1 text-sm text-gray-400">实时访问量（每 2 秒刷新）</p>
        <p className="text-3xl font-bold">{points[points.length - 1] ?? 0}</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p className="mb-4 text-sm text-gray-400">最近访问趋势</p>
        <div className="flex h-40 items-end gap-1.5">
          {points.map((value, i) => (
            <div
              key={i}
              className="w-7 rounded-t bg-sky-500 transition-all"
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-400">累计采样：{total}</p>
      </div>
    </div>
  );
}
