import { defineStore } from "pinia";
import { storage } from "@/utils/storage";

export type ThemeMode = "light" | "dark" | "system";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    mode: storage.get<ThemeMode>("theme", "system"),
  }),
  actions: {
    setTheme(mode: ThemeMode) {
      this.mode = mode;
      storage.set("theme", mode);
    },
  },
});
