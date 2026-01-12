<script setup lang="ts">
import { computed } from "vue";
import { useSidebar } from "@/composables/useSidebar";
import { navigation } from "@/config/navigation";
import SidebarNavItem from "./SidebarNavItem.vue";
import SidebarNavGroup from "./SidebarNavGroup.vue";

// Get shared collapsed state
const { isCollapsed } = useSidebar();

const sidebarClasses = computed(() => [
  "flex flex-col border-r border-[var(--border-color)] bg-[var(--body-bg-alt)] transition-all duration-300",
  isCollapsed.value ? "w-20" : "w-64",
]);
</script>

<template>
  <aside :class="sidebarClasses">
    <div class="h-16 flex items-center px-4 font-semibold text-lg">Phoenix</div>

    <nav class="px-2 py-4 space-y-1.5">
      <template v-for="item in navigation" :key="item.label">
        <SidebarNavGroup v-if="item.children" :item="item" />
        <SidebarNavItem
          v-else
          :label="item.label"
          :route-name="item.routeName!"
          :icon="item.icon"
        />
      </template>
    </nav>
  </aside>
</template>
