import { Suspense } from "react";
import { Outlet, Link, useLocation } from "react-router";
import NavigationProgress from "@/components/NavigationProgress";
import ErrorBoundary from "@/components/ErrorBoundary";

const navItems = [
  { path: "/", label: "首页" },
  { path: "/articles", label: "文章" },
  { path: "/about", label: "关于" },
];

export default function BaseLayout() {
  const location = useLocation();

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
    </div>
  );
}
