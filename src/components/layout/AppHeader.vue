<script setup lang="ts">
import { ref } from "vue";
import { Menu, Search } from "lucide-vue-next";
import ThemeToggle from "./ThemeToggle.vue";
import NotificationsDropdown from "./NotificationsDropdown.vue";
import UserMenuDropdown from "./UserMenuDropdown.vue";
import { useLayout } from "@/composables/useLayout";

const { openMobileSidebar } = useLayout();

// Search input state
const searchQuery = ref("");
</script>

<template>
  <header
    class="h-16 border-b border-(--border-color) bg-(--body-bg-alt) flex items-center justify-between px-4"
  >
    <!-- Left: Mobile sidebar toggle -->
    <div class="flex items-center gap-2">
      <button
        class="p-2 rounded-md hover:bg-(--primary-soft) transition-colors md:hidden cursor-pointer"
        @click="openMobileSidebar"
        aria-label="Open Mobile Sidebar"
      >
        <Menu class="w-5 h-5 text-(--primary)" />
      </button>
    </div>

    <!-- Center: Search bar -->
    <div class="flex-1 flex justify-center">
      <div
        class="hidden md:flex items-center w-80 bg-(--body-bg) border border-(--border-color) rounded-full px-4 py-1 shadow-sm"
      >
        <Search class="w-4 h-4 text-muted mr-2" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="flex-1 bg-transparent outline-none text-sm text-text placeholder:text-muted"
        />
      </div>
    </div>

    <!-- Right: Controls -->
    <div class="flex items-center gap-2">
      <ThemeToggle />
      <NotificationsDropdown />

      <!-- Profile avatar -->
      <div class="relative">
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          class="w-8 h-8 rounded-full border-2 border-(--primary) cursor-pointer"
        />
      </div>

      <UserMenuDropdown />
    </div>
  </header>
</template>
