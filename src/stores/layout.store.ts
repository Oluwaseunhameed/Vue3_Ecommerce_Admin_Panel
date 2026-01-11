import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useLayoutStore = defineStore("layout", () => {
  const sidebarOpen = ref(true);
  const mobileSidebarOpen = ref(false);

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
  };

  const openMobileSidebar = () => {
    mobileSidebarOpen.value = true;
  };

  const closeMobileSidebar = () => {
    mobileSidebarOpen.value = false;
  };

  const isCollapsed = computed(() => !sidebarOpen.value);

  return {
    sidebarOpen,
    mobileSidebarOpen,
    isCollapsed,
    toggleSidebar,
    openMobileSidebar,
    closeMobileSidebar,
  };
});
