import { storeToRefs } from "pinia";
import { useLayoutStore } from "@/stores/layout.store";

export function useLayout() {
  const store = useLayoutStore();
  const state = storeToRefs(store);

  return {
    ...state,
    toggleSidebar: store.toggleSidebar,
    openMobileSidebar: store.openMobileSidebar,
    closeMobileSidebar: store.closeMobileSidebar,
  };
}
