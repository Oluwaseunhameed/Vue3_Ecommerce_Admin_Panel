<script setup lang="ts" generic="T extends Record<string, unknown>">
defineProps<{
  item: T
  columns: { key: keyof T }[]
}>()
</script>

<template>
  <tr
  class="border-b border-(--border-color) last:border-none
         hover:bg-(--primary-soft) transition-colors duration-200 ease-in-out"
  >
    <td
      v-for="col in columns"
      :key="String(col.key)"
      class="px-6 py-4 text-sm"
    >
      <!-- Render status badge for 'status' column -->
      <template v-if="col.key === 'status' && typeof item[col.key] === 'string'">
        <span
          :class="[
            'px-2 py-1 rounded-md text-sm',
            item[col.key] === 'Completed'
              ? 'bg-success/10 text-success'
              : 'bg-destructive/10 text-destructive'
          ]"
        >
          {{ item[col.key] }}
        </span>
      </template>

      <!-- Default rendering for other columns -->
      <template v-else>
        {{ item[col.key] }}
      </template>
    </td>
  </tr>
</template>
