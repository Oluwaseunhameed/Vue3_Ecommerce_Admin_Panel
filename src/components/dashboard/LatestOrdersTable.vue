<script setup lang="ts">
defineProps<{
  items: { id: string; customer: string; total: string; status: string }[]
}>()
</script>

<template>
  <div class="rounded-xl border border-(--border-color) bg-(--body-bg-alt) p-4">
    <h3 class="font-semibold mb-4">Latest Orders</h3>

    <table class="w-full text-sm">
      <thead>
        <tr class="text-left text-muted">
          <th class="py-2">Order</th>
          <th class="py-2">Customer</th>
          <th class="py-2">Total</th>
          <th class="py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="o in items" :key="o.id" class="border-t border-(--border-color)">
          <td class="py-2">{{ o.id }}</td>
          <td class="py-2">{{ o.customer }}</td>
          <td class="py-2 font-medium">{{ o.total }}</td>
          <td class="py-2">
            <span class="px-2 py-1 rounded-md bg-success/10 text-success">
              {{ o.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
