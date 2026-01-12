// src/composables/useSidebar.ts
import { ref, computed } from "vue";
import { useLocalStorage } from "@vueuse/core";

const _isCollapsed = useLocalStorage<boolean>("sidebar-collapsed", false); // persisted
const isCollapsed = ref(_isCollapsed.value); // reactive singleton

// keep reactive in sync with localStorage
_isCollapsed.value = isCollapsed.value;

export function useSidebar() {
  const toggle = () => {
    isCollapsed.value = !isCollapsed.value;
    _isCollapsed.value = isCollapsed.value; // sync to localStorage
  };

  const open = () => {
    isCollapsed.value = false;
    _isCollapsed.value = false;
  };

  const close = () => {
    isCollapsed.value = true;
    _isCollapsed.value = true;
  };

  return { isCollapsed, toggle, open, close };
}
