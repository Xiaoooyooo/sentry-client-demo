import "./lib/sentry";
import { Toaster } from "sonner";
import { createRoot } from "react-dom/client";

import App from "./App";
import "@/assets/style/tailwind.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <>
    <Toaster richColors position="top-center" />
    <App />
  </>,
);
