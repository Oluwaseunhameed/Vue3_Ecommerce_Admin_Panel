<script setup lang="ts" generic="T extends Record<string, unknown>">
defineProps<{
  item: T
  columns: { key: keyof T }[]
}>()
</script>

<template>
  <tr
    class="border-b border-[var(--border-color)]
           last:border-none
           hover:bg-[var(--primary-soft)]
           transition-colors"
  >
    <td
      v-for="col in columns"
      :key="String(col.key)"
      class="px-6 py-4 text-sm"
    >
      {{ item[col.key] }}
    </td>
  </tr>
</template>
