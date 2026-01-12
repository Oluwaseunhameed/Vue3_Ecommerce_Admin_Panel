<script setup lang="ts">
import { onMounted } from 'vue'
import { useCustomersStore } from '@/stores/customers.store'
import BaseTable from '@/components/table/BaseTable.vue'
import TableRow from '@/components/table/TableRow.vue'
import TableEmpty from '@/components/table/TableEmpty.vue'
import type { Customer } from '@/types/customer'

const store = useCustomersStore()

const columns = [
  { key: 'name', label: 'Customer' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' },
] satisfies readonly { key: keyof Customer; label: string }[]

onMounted(store.fetchAll)
</script>

<template>
  <BaseTable :columns="columns">
    <template v-if="store.customers.length">
      <TableRow
        v-for="customer in store.customers"
        :key="customer.id"
        :item="customer"
        :columns="columns"
      />
    </template>

    <TableEmpty v-else />
  </BaseTable>
</template>
