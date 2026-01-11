<script setup lang="ts">
import { Menu } from "@headlessui/vue";
import { Bell } from "lucide-vue-next";

const notifications = [
  { id: 1, title: "New order received", time: "2m ago" },
  { id: 2, title: "Server rebooted", time: "1h ago" },
  { id: 3, title: "New message from Alice", time: "3h ago" },
];
</script>

<template>
  <Menu as="div" class="relative">
    <Menu.Button
      class="p-2 rounded-md hover:bg-(--primary-soft) transition-colors"
      aria-label="Notifications"
    >
      <Bell class="w-5 h-5 text-(--primary)" />
    </Menu.Button>

    <Menu.Items
      class="absolute right-0 mt-2 w-64 bg-(--body-bg-alt) border border-(--border-color) rounded-md shadow-phoenix z-50"
    >
      <div class="p-2 font-semibold border-b border-(--border-color)">Notifications</div>
      <div class="max-h-64 overflow-y-auto">
        <Menu.Item
          v-for="n in notifications"
          :key="n.id"
          as="div"
          class="px-4 py-2 hover:bg-(--primary-soft) cursor-pointer transition-colors text-sm"
        >
          <div>{{ n.title }}</div>
          <div class="text-xs text-muted">{{ n.time }}</div>
        </Menu.Item>
      </div>
    </Menu.Items>
  </Menu>
</template>
