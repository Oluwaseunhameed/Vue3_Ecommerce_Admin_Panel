// src/composables/useTheme.ts
import { watchEffect, computed } from "vue";
import { usePreferredDark } from "@vueuse/core";
import { useThemeStore } from "@/stores/theme.store";

export function useTheme() {
  const store = useThemeStore();
  const prefersDark = usePreferredDark();

  // Reactive boolean: is dark mode active
  const isDark = computed(() => {
    return (
      store.mode === "dark" || (store.mode === "system" && prefersDark.value)
    );
  });

  // Watch and apply dark class
  watchEffect(() => {
    document.documentElement.classList.toggle("dark", isDark.value);
  });

  // Helper to toggle theme between dark and light
  function toggleTheme() {
    if (store.mode === "dark") store.setTheme("light");
    else store.setTheme("dark");
  }

  return {
    store,
    isDark,
    toggleTheme,
    setTheme: store.setTheme,
  };
}
