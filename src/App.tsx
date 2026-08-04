import { useEffect } from "react";
import { RouterProvider } from "react-router/dom";
import router from "@/router";
import { useSettingsStore } from "@/store/settings";
import MediaContextProvider from "./components/Providers/MediaContextProvider";

export default function App() {
  const fontSize = useSettingsStore((state) => state.fontSize);

  useEffect(() => {
    document.documentElement.style.fontSize = fontSize;
  }, [fontSize]);

  return (
    <MediaContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </MediaContextProvider>
  );
}
