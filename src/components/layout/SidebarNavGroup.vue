<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronDown } from 'lucide-vue-next'
import SidebarNavItem from './SidebarNavItem.vue'
import { ref } from 'vue'
import type { NavItem } from '@/config/navigation'
import { v4 as uuidv4 } from 'uuid'

// Props
const props = defineProps<{ item: NavItem }>()

// Unique IDs for ARIA
const groupId = `sidebar-group-${uuidv4()}`
const panelId = `sidebar-panel-${uuidv4()}`

// Open state (from HeadlessUI)
const isOpen = ref(false)
</script>

<template>
  <Disclosure v-model="isOpen">
    <DisclosureButton
      :id="groupId"
      :aria-expanded="isOpen.toString()"
      :aria-controls="panelId"
      class="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-text hover:bg-primary-soft/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <span class="flex items-center gap-3">
        <component v-if="item.icon" :is="item.icon" class="w-5 h-5" />
        {{ item.label }}
      </span>
      <ChevronDown
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </DisclosureButton>

    <DisclosurePanel
      :id="panelId"
      class="pl-6 space-y-1"
      role="group"
    >
      <SidebarNavItem
        v-for="child in item.children"
        :key="child.routeName"
        :label="child.label"
        :route-name="child.routeName!"
        :icon="child.icon"
      />
    </DisclosurePanel>
  </Disclosure>
</template>
