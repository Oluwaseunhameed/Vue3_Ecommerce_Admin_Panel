<script setup lang="ts">
import { Menu } from "@headlessui/vue";
import { User, LogOut, Settings } from "lucide-vue-next";

const userActions = [
  { id: 1, label: "Profile", icon: User, action: () => console.log("Profile clicked") },
  { id: 2, label: "Settings", icon: Settings, action: () => console.log("Settings clicked") },
  { id: 3, label: "Logout", icon: LogOut, action: () => console.log("Logout clicked") },
];
</script>

<template>
  <Menu as="div" class="relative">
    <Menu.Button
      class="flex items-center gap-2 rounded-md hover:bg-(--primary-soft) p-2 transition-colors"
    >
      <div
        class="w-8 h-8 rounded-full bg-(--primary) flex items-center justify-center text-white font-semibold"
      >
        U
      </div>
      <span class="hidden sm:block">Username</span>
    </Menu.Button>

    <Menu.Items
      class="absolute right-0 mt-2 w-48 bg-(--body-bg-alt) border border-(--border-color) rounded-md overflow-hidden shadow-phoenix z-50"
    >
      <Menu.Item
        v-for="action in userActions"
        :key="action.id"
        as="button"
        class="flex items-center gap-2 px-4 py-2 w-full hover:bg-(--primary-soft) text-sm transition-colors"
        @click="action.action"
      >
        <component :is="action.icon" class="w-4 h-4" />
        <span>{{ action.label }}</span>
      </Menu.Item>
    </Menu.Items>
  </Menu>
</template>
