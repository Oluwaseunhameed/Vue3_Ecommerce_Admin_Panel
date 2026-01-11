<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronDown } from 'lucide-vue-next'
import SidebarNavItem from './SidebarNavItem.vue'
import type { NavItem } from '@/config/navigation'

defineProps<{
  item: NavItem
}>()
</script>

<template>
  <Disclosure>
    <DisclosureButton
      class="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-text hover:bg-primary-soft/50 focus:outline-none"
    >
      <span class="flex items-center gap-3">
        <component v-if="item.icon" :is="item.icon" class="w-5 h-5" />
        {{ item.label }}
      </span>

      <ChevronDown class="w-4 h-4 transition-transform ui-open:rotate-180" />
    </DisclosureButton>



    <DisclosurePanel class="pl-6 space-y-1">
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
