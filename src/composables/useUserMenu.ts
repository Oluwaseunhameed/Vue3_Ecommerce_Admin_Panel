import { ref } from "vue";

export function useUserMenu() {
  const isOpen = ref(false);

  function toggleMenu() {
    isOpen.value = !isOpen.value;
  }

  function closeMenu() {
    isOpen.value = false;
  }

  return { isOpen, toggleMenu, closeMenu };
}
