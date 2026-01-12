<script setup lang="ts">
import BaseTable from './BaseTable.vue'
import TableRow from './TableRow.vue'
import type { TableColumn } from '@/types/table'

const props = defineProps<{
  orders: { id: string; customer: string; total: string; status: string }[]
}>()

const columns: TableColumn<typeof props.orders[0]>[] = [
  { key: 'id', label: 'Order ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'total', label: 'Total' },
  { key: 'status', label: 'Status' }
]
</script>

<template>
  <BaseTable :columns="columns">
    <TableRow
      v-for="order in orders"
      :key="order.id"
      :item="order"
      :columns="columns"
    />
  </BaseTable>
</template>
