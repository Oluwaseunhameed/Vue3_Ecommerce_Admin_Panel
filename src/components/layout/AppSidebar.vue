<script setup lang="ts">
import { computed } from "vue";
import { useSidebar } from "@/composables/useSidebar";
import { navigation } from "@/config/navigation";
import SidebarNavItem from "./SidebarNavItem.vue";
import SidebarNavGroup from "./SidebarNavGroup.vue";
import { ChevronsLeft, ChevronsRight, Box } from "lucide-vue-next"; // Box as logo icon

const { isCollapsed, toggle } = useSidebar();

// Dynamic classes for sidebar width
const sidebarClasses = computed(() => [
  "flex flex-col border-r border-[var(--border-color)] bg-[var(--body-bg-alt)] transition-all duration-300",
  isCollapsed.value ? "w-20" : "w-64",
]);
</script>

<template>
  <aside :class="sidebarClasses">
    <!-- Logo Area -->
    <div
      class="h-16 flex items-center justify-center gap-2 border-b border-(--border-color) px-2"
    >
      <!-- Logo Icon -->
      <Box class="w-6 h-6 text-primary" />

      <!-- Logo Text (hidden when collapsed) -->
      <span v-if="!isCollapsed" class="font-semibold text-lg">OH Store</span>
    </div>

    <!-- Navigation -->
    <nav class="px-2 py-4 space-y-1.5 flex-1 overflow-y-auto">
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

    <!-- Collapse Toggle (Desktop Only) -->
    <button
      @click="toggle"
      class="hidden md:flex items-center justify-center h-12 w-full border-t border-(--border-color) hover:bg-(--primary-soft) transition-colors"
      aria-label="Collapse Sidebar"
    >
      <component
        :is="isCollapsed ? ChevronsRight : ChevronsLeft"
        class="w-5 h-5 text-(--primary)"
      />
    </button>
  </aside>
</template>
