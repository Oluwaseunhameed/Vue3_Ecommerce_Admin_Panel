import { computed } from "vue";
import { useDark } from "@vueuse/core";

export function useEChartsTheme() {
  const isDark = useDark();

  const theme = computed(() => ({
    backgroundColor: "transparent",
    textColor: isDark.value ? "#cbd5e1" : "#334155",
    gridColor: isDark.value ? "#1e293b" : "#e5e7eb",
    axisLine: isDark.value ? "#475569" : "#cbd5e1",
    primary: "var(--primary)",
  }));

  return { theme };
}
