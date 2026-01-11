<script setup lang="ts">
import { Transition } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import AppContent from './AppContent.vue'
import { useLayout } from '@/composables/useLayout'

const { mobileSidebarOpen, closeMobileSidebar } = useLayout()
</script>

<template>
  <div class="min-h-screen flex bg-body text-text">

    <!-- Desktop Sidebar -->
    <AppSidebar class="hidden md:flex" />

    <!-- Mobile Sidebar Overlay -->
    <Transition enter-active-class="transition-opacity duration-300" leave-active-class="transition-opacity duration-300">
      <div
        v-if="mobileSidebarOpen"
        class="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
        @click="closeMobileSidebar"
      ></div>
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
    <div class="flex flex-col flex-1 min-w-0">
      <AppHeader />
      <AppContent />
    </div>
  </div>
</template>
