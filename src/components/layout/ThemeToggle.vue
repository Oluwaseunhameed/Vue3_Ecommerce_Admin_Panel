<script setup lang="ts">
import { Sun, Moon } from "lucide-vue-next";
import { useTheme } from "@/composables/useTheme";

const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-md hover:bg-(--primary-soft) transition-colors"
    aria-label="Toggle Theme"
  >
    <component :is="isDark ? Sun : Moon" class="w-5 h-5 text-(--primary)" />
  </button>
</template>
