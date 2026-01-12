<script setup lang="ts">
defineProps<{
  items: { name: string; sales: number }[]
}>()
</script>

<template>
  <div class="rounded-xl border border-(--border-color) bg-(--body-bg-alt) p-4">
    <h3 class="font-semibold mb-4">Top Products</h3>

    <table class="w-full text-sm">
      <thead>
        <tr class="text-left text-muted">
          <th class="py-2">Product</th>
          <th class="py-2">Sales</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.name" class="border-t border-(--border-color)">
          <td class="py-2">{{ item.name }}</td>
          <td class="py-2 font-medium">{{ item.sales }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
