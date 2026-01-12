<template>
  <div class="flex min-h-screen bg-body text-text">
    <!-- Desktop Sidebar -->
    <AppSidebar class="hidden md:flex fixed top-0 left-0 h-screen z-20" />

    <!-- Mobile Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
    >
      <div
        v-if="mobileSidebarOpen"
        class="fixed inset-0 z-40 bg-black/40 md:hidden"
        @click="closeMobileSidebar"
      />
    </Transition>

    <!-- Mobile Sliding Sidebar -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-in-out"
      leave-active-class="transition-transform duration-300 ease-in-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-if="mobileSidebarOpen"
        class="fixed inset-y-0 left-0 z-50 w-64 bg-(--body-bg-alt) border-r border-(--border-color) md:hidden flex flex-col"
      >
        <AppSidebar />
      </aside>
    </Transition>

    <!-- Main Content -->
    <div
      class="flex flex-col flex-1 min-w-0 transition-all duration-300"
      :class="isCollapsed ? 'md:ml-20' : 'md:ml-64'"
    >
      <AppHeader class="relative z-30" />
      <AppContent :is-collapsed="isCollapsed" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';
import AppContent from './AppContent.vue';
import { useSidebar } from '@/composables/useSidebar';
import { useLayout } from '@/composables/useLayout';

export default defineComponent({
  name: 'AppLayout',
  components: { AppHeader, AppSidebar, AppContent },
  setup() {
    const { isCollapsed } = useSidebar();
    const { mobileSidebarOpen, closeMobileSidebar } = useLayout();
    return { isCollapsed, mobileSidebarOpen, closeMobileSidebar };
  },
});
</script>
