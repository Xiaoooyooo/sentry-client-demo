import createStore from "./createStore";

export type FontSize = "14px" | "16px" | "18px";

type SettingsState = {
  fontSize: FontSize;
  setFontSize: (fontSize: FontSize) => void;
};

const savedSettings = JSON.parse(localStorage.getItem("settings") || "{}");

export const useSettingsStore = createStore<SettingsState>((set) => ({
  fontSize: savedSettings.fontSize ?? "16px",
  setFontSize(fontSize) {
    set({ fontSize });
    localStorage.setItem("settings", fontSize);
  },
}));
