<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Component } from 'vue'
import { useSidebar } from '@/composables/useSidebar'
import { useLayout } from '@/composables/useLayout'

const props = defineProps<{
  label: string
  routeName: string
  icon?: Component
}>()

const route = useRoute()
const router = useRouter()

const { isCollapsed } = useSidebar()
const { closeMobileSidebar } = useLayout()

// Active route
const isActive = computed(() => route.name === props.routeName)

// Navigation function
function navigate() {
  if (!isActive.value) router.push({ name: props.routeName })
  if (window.innerWidth < 768) closeMobileSidebar()
}

// Focus & hover classes (DRY)
const baseClasses = 'group flex items-center rounded-md px-3 py-3 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
const activeClasses = 'bg-primary-soft font-semibold'
const hoverClasses = 'hover:bg-primary-soft/40'
</script>

<template>
  <div
    role="link"
    tabindex="0"
    :aria-current="isActive ? 'page' : undefined"
    @click="navigate"
    @keydown.enter.space.prevent="navigate"
    :class="[baseClasses, isActive ? activeClasses : hoverClasses]"
  >
    <component
      v-if="icon"
      :is="icon"
      class="w-5 h-5 shrink-0 transition-colors"
      :class="isActive ? 'text-(--sidebar-icon) font-semibold' : 'text-text'"
    />
    <span
      v-if="!isCollapsed"
      class="ml-3 text-[15px] transition-colors"
      :class="isActive ? 'font-semibold text-(--sidebar-text)' : 'font-medium text-text'"
    >
      {{ label }}
    </span>
  </div>
</template>
