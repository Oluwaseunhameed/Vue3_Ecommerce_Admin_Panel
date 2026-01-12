<script setup lang="ts">
import { onMounted } from 'vue'
import { useOrdersStore } from '@/stores/orders.store'
import BaseTable from '@/components/table/BaseTable.vue'
import TableRow from '@/components/table/TableRow.vue'
import TableEmpty from '@/components/table/TableEmpty.vue'
import type { Order } from '@/types/order'

const store = useOrdersStore()

const columns = [
  { key: 'id', label: 'Order ID' },
  { key: 'status', label: 'Status' },
  { key: 'total', label: 'Total' },
] satisfies readonly { key: keyof Order; label: string }[]

onMounted(store.fetchAll)
</script>

<template>
  <BaseTable :columns="columns">
    <template v-if="store.orders.length">
      <TableRow
        v-for="order in store.orders"
        :key="order.id"
        :item="order"
        :columns="columns"
      />
    </template>

    <TableEmpty v-else />
  </BaseTable>
</template>
