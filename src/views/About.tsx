import { profile } from "@/lib/mock";
import { useEffect } from "react";
import { logger } from "@/lib/sentry";

export default function About() {
  useEffect(() => {
    logger.info("进入 About 页面");
    return () => {
      logger.info("离开 About 页面");
    };
  }, []);
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-xl bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold">关于我</h1>

        <div className="mb-6">
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
              {profile.name[0]}
            </div>
            <div>
              <h2 className="text-lg font-semibold">{profile.name}</h2>
              <p className="text-sm text-gray-400">前端工程师</p>
            </div>
          </div>
          <p className="leading-relaxed text-gray-600">{profile.bio}</p>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 font-medium">技术栈</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-medium">联系方式</h3>
          <div className="space-y-2 text-sm text-gray-500">
            <p>
              📧 邮箱：
              <a
                href={`mailto:${profile.email}`}
                className="text-blue-600 hover:underline"
              >
                {profile.email}
              </a>
            </p>
            <p>
              💻 GitHub：
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {profile.github}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
