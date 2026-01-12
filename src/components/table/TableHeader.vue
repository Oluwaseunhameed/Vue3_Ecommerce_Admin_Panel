<script setup lang="ts" generic="T extends Record<string, unknown>">
import type { TableColumn } from '@/types/table'

defineProps<{
  columns: TableColumn<T>[]
}>()
</script>

<template>
  <thead
    class="border-b border-(--border-color)
           bg-(--body-bg)"
  >
    <tr>
      <th
        v-for="col in columns"
        :key="String(col.key)"
        class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide
               text-muted"
      >
        {{ col.label }}
      </th>
    </tr>
  </thead>
</template>
