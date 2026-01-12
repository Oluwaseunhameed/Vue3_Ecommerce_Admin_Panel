<template>
  <main
    :class="[
      'flex-1 overflow-y-auto p-6 transition-all duration-300 bg-body min-h-screen',
      isCollapsed ? 'ml-20' : 'ml-64'
    ]"
  >
    <!-- Responsive Grid Wrapper -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full"
    >
      <!-- Default slot content -->
      <slot />

      <!-- Fallback to router-view if slot is empty -->
      <router-view v-if="!hasSlot" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useSidebar } from '@/composables/useSidebar';

export default defineComponent({
  name: 'AppContent',
  setup(_, { slots }) {
    const { isCollapsed } = useSidebar();

    // Detect if the default slot has content
    const hasSlot = computed(() => !!slots.default?.());

    return { isCollapsed, hasSlot };
  },
});
</script>

<style scoped>
/* Ensure mobile takes full width when sidebar is collapsed */
@media (max-width: 1024px) {
  main {
    margin-left: 0 !important;
  }
}
</style>
