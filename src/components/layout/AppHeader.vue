<script setup lang="ts">
import { Menu } from "lucide-vue-next";
import ThemeToggle from "./ThemeToggle.vue";
import NotificationsDropdown from "./NotificationsDropdown.vue";
import UserMenuDropdown from "./UserMenuDropdown.vue";
import { useSidebar } from "@/composables/useSidebar";
import { useLayout } from "@/composables/useLayout";

// Desktop sidebar (persistent)
const { toggle: toggleSidebar } = useSidebar();

// Mobile overlay
const { openMobileSidebar } = useLayout();
</script>

<template>
  <header class="h-16 border-b border-(--border-color) bg-(--body-bg-alt) flex items-center justify-between px-4">
    <!-- Desktop toggle -->
    <button
      class="p-2 rounded-md hover:bg-(--primary-soft) transition-colors hidden md:inline-flex cursor-pointer"
      @click="toggleSidebar"
      aria-label="Toggle Sidebar"
    >
      <Menu class="w-5 h-5 text-(--primary)" />
    </button>

    <!-- Mobile toggle -->
    <button
      class="p-2 rounded-md hover:bg-(--primary-soft) transition-colors md:hidden cursor-pointer"
      @click="openMobileSidebar"
      aria-label="Open Mobile Sidebar"
    >
      <Menu class="w-5 h-5 text-(--primary)" />
    </button>

    <!-- Right-side controls -->
    <div class="flex items-center gap-2">
      <ThemeToggle />
      <NotificationsDropdown />
      <UserMenuDropdown />
    </div>
  </header>
</template>
