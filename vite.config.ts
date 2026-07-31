import "dotenv/config";
import path from "path";
import url from "url";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import babel from "@rolldown/plugin-babel";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import packageJson from "./package.json" with { type: "json" };

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const __DEV__ = process.env.NODE_ENV !== "production";
const __VERSION__ = packageJson.version;
const __SENTRY_DSN__ = process.env.SENTRY_DSN;

export default defineConfig({
  plugins: [
    react(),
    babel({ plugins: ["babel-plugin-react-compiler"] }),
    tailwindcss(),
    svgr({
      include: "**/*.svg?jsx",
      svgrOptions: {
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  // viewBox is required to resize SVGs with CSS.
                  // @see https://github.com/svg/svgo/issues/1128
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      },
    }),
    sentryVitePlugin({
      url: process.env.SENTRY_URL,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      release: { name: __VERSION__ },
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  define: {
    __DEV__,
    __VERSION__: JSON.stringify(__VERSION__),
    __SENTRY_DSN__: JSON.stringify(__SENTRY_DSN__),
  },
  build: {
    sourcemap: "hidden",
  },
  dev: {
    sourcemap: true,
  },
  server: {
    headers: {
      "Document-Policy": "js-profiling",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
