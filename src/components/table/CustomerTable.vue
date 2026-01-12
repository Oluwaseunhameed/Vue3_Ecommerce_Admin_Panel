<script setup lang="ts">
import BaseTable from './BaseTable.vue'
import TableRow from './TableRow.vue'
import type { TableColumn } from '@/types/table'

const props = defineProps<{
  customers: { id: string; name: string; email: string; status: string }[]
}>()

const columns: TableColumn<typeof props.customers[0]>[] = [
  { key: 'id', label: 'Customer ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' }
]
</script>

<template>
  <BaseTable :columns="columns">
    <TableRow
      v-for="customer in customers"
      :key="customer.id"
      :item="customer"
      :columns="columns"
    />
  </BaseTable>
</template>
