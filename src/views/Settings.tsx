import { useEffect } from "react";
import clsm from "@/lib/utils/clsm";
import { logger } from "@/lib/sentry";
import { useSettingsStore, type FontSize } from "@/store/settings";

const fontSizeOptions: { label: string; value: FontSize }[] = [
  { label: "小", value: "14px" },
  { label: "标准", value: "16px" },
  { label: "大", value: "18px" },
];

export default function Settings() {
  const fontSize = useSettingsStore((state) => state.fontSize);
  const setFontSize = useSettingsStore((state) => state.setFontSize);

  useEffect(() => {
    logger.info("进入 Settings 页面");
    return () => {
      logger.info("离开 Settings 页面");
    };
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold">设置</h1>

      <div className="rounded-xl bg-white p-8 shadow-sm">
        <h2 className="mb-1 font-medium">页面字号</h2>
        <p className="mb-4 text-sm text-gray-400">
          调整全站基础字号，选择后立即生效并自动保存。
        </p>
        <div className="flex gap-2">
          {fontSizeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFontSize(option.value)}
              className={clsm(
                "cursor-pointer rounded-md border px-4 py-2 text-sm transition-colors",
                option.value === fontSize
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
