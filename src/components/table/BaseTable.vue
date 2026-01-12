<script setup lang="ts" generic="T extends Record<string, unknown>">
import TableHeader from './TableHeader.vue'
import type { TableColumn } from '@/types/table'

defineProps<{
  columns: TableColumn<T>[]
}>()
</script>

<template>
  <div class="overflow-x-auto rounded-xl border border-(--border-color) bg-(--body-bg-alt) shadow-phoenix">
    <table class="w-full text-sm text-(--body-color)">
      <TableHeader :columns="columns" />
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>

</template>
