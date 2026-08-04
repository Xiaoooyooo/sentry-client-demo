import { Suspense, useEffect, useRef, useState, type MouseEvent } from "react";
import { Outlet, Link, useLocation } from "react-router";
import NavigationProgress from "@/components/NavigationProgress";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useUserStore } from "@/store/user";
import { logger, sentryFeedbackTool } from "@/lib/sentry";

const navItems = [
  { path: "/", label: "首页" },
  { path: "/articles", label: "文章" },
  { path: "/messages", label: "留言板" },
  { path: "/dashboard", label: "看板" },
  { path: "/about", label: "关于" },
  { path: "/settings", label: "设置" },
];

export default function BaseLayout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  function onClose() {
    setIsOpen(false);
  }

  const auth = useUserStore((state) => state.auth);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    auth();
  }, []);

  useEffect(() => {
    if (user) {
      sentryFeedbackTool.setUser(user);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <Link to="/" className="text-lg font-bold tracking-tight">
            My Blog
          </Link>
          <nav className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm transition-colors hover:text-blue-600 ${
                  location.pathname === item.path
                    ? "font-medium text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {!!user ? (
              <div className="text-sm font-medium text-gray-500">
                {user.fullName}
                <button
                  onClick={logout}
                  className="ml-2 rounded-md bg-red-600 px-2 py-1 text-sm font-medium text-white transition-colors hover:bg-red-700"
                >
                  退出
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                登录
              </button>
            )}
          </div>
        </div>
      </header>

      <ErrorBoundary>
        <Suspense fallback={<NavigationProgress />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>

      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
        © 2026 My Blog. All rights reserved.
      </footer>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const login = useUserStore((state) => state.login);
  const formEl = useRef<HTMLFormElement>(null);
  function handleSubmit(event: MouseEvent) {
    event.preventDefault();
    const formData = new FormData(formEl.current!);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const emailProvider = email.split("@")[1]?.toLowerCase() ?? "unknown";
    login({ username, email, fullName: username });
    logger.info("用户登录", { username, emailProvider });
    onClose();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 cursor-pointer text-2xl text-gray-500"
      >
        X
      </button>
      <div className="rounded-md bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">登录</h2>
        <form ref={formEl}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              用户名
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              邮箱
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              onClick={handleSubmit}
            >
              登录
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
