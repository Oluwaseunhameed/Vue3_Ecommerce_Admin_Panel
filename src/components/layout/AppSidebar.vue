<script setup lang="ts">
import { computed } from "vue";
import { useLayout } from "@/composables/useLayout";
import { navigation } from "@/config/navigation";
import SidebarNavItem from "./SidebarNavItem.vue";
import SidebarNavGroup from "./SidebarNavGroup.vue";

const { sidebarOpen } = useLayout();

const sidebarClasses = computed(() => [
  "flex flex-col border-r border-[var(--border-color)] bg-[var(--body-bg-alt)] transition-all duration-300",
  sidebarOpen.value ? "w-64" : "w-[72px]",
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
