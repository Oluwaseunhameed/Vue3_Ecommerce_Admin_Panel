<script setup lang="ts">
import { ref } from "vue"
import { v4 as uuid } from "uuid"
import type { Order } from "@/types/customer"
import { formatCurrency, formatDate } from "@/utils/formatters"

const customer = ref({
  name: "John Carter",
  email: "john@example.com",
  country: "USA",
  isVIP: true,
  avatar: "https://i.pravatar.cc/150?img=1",
  joinedAt: new Date("2023-01-12"),
})

const orders = ref<Order[]>([
  {
    id: uuid(),
    date: new Date(),
    amount: 320,
    status: "completed",
  },
  {
    id: uuid(),
    date: new Date(),
    amount: 120,
    status: "pending",
  },
])
</script>

<template>
  <div class="space-y-6">
    <!-- Profile -->
    <div class="flex items-center gap-6 rounded-lg bg-(--body-bg-alt) border border-(--border-color) p-6">
      <img :src="customer.avatar" class="h-20 w-20 rounded-full" />
      <div>
        <h2 class="text-lg font-semibold">{{ customer.name }}</h2>
        <p class="text-sm">{{ customer.email }}</p>
        <p class="text-xs mt-1">Joined {{ formatDate(customer.joinedAt) }}</p>
      </div>
    </div>

    <!-- Orders -->
    <div class="rounded-lg border border-(--border-color) bg-(--body-bg-alt)">
      <h3 class="px-6 py-4 font-semibold">Orders</h3>
      <table class="w-full text-md">
        <thead class="bg-(--body-bg)">
          <tr>
            <th class="px-6 py-3 text-left">Date</th>
            <th class="px-6 py-3 text-left">Amount</th>
            <th class="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="o in orders"
            :key="o.id"
            class="border-t border-(--border-color)"
          >
            <td class="px-6 py-3">{{ formatDate(o.date) }}</td>
            <td class="px-6 py-3">{{ formatCurrency(o.amount) }}</td>
            <td class="px-6 py-3">
              <span
                class="rounded-full px-2 py-1 text-xs"
                :class="o.status === 'completed'
                  ? 'bg-(--success)/10 text-(--success)'
                  : 'bg-(--warning)/10 text-(--warning)'"
              >
                {{ o.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
