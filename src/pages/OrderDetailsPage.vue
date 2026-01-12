<script setup lang="ts">
import { ref } from "vue"
import { formatCurrency, formatDate } from "@/utils/formatters"

const order = ref({
  id: "ORD-23892",
  status: "completed",
  placedAt: new Date("2024-02-18"),
  customer: "John Carter",
  email: "john@example.com",
  address: {
    line1: "123 Market Street",
    city: "San Francisco",
    country: "USA",
  },
})

const items = ref([
  { name: "Wireless Headphones", qty: 1, price: 320 },
  { name: "Smart Watch Pro", qty: 2, price: 299 },
])

const timeline = ref([
  { label: "Order placed", date: new Date("2024-02-18") },
  { label: "Payment confirmed", date: new Date("2024-02-18") },
  { label: "Delivered", date: new Date("2024-02-20") },
])
</script>

<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-semibold">Order {{ order.id }}</h1>
      <span class="rounded-full bg-(--success)/10 text-(--success) px-3 py-1 text-sm">
        {{ order.status }}
      </span>
    </div>

    <!-- Summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

      <!-- Customer -->
      <div class="card">
        <h3 class="card-title">Customer</h3>
        <p class="font-medium">{{ order.customer }}</p>
        <p class="text-sm">{{ order.email }}</p>
      </div>

      <!-- Address -->
      <div class="card">
        <h3 class="card-title">Shipping Address</h3>
        <p>{{ order.address.line1 }}</p>
        <p>{{ order.address.city }}, {{ order.address.country }}</p>
      </div>

      <!-- Date -->
      <div class="card">
        <h3 class="card-title">Order Date</h3>
        <p>{{ formatDate(order.placedAt) }}</p>
      </div>
    </div>

    <!-- Items -->
    <div class="rounded-lg border border-(--border-color) bg-(--body-bg-alt)">
      <h3 class="px-6 py-4 font-semibold border-b border-(--border-color)">
        Order Items
      </h3>

      <table class="w-full text-sm">
        <thead class="bg-body-bg">
          <tr>
            <th class="px-6 py-3 text-left">Product</th>
            <th class="px-6 py-3 text-left">Quantity</th>
            <th class="px-6 py-3 text-right">Price</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in items"
            :key="item.name"
            class="border-t border-(--border-color)"
          >
            <td class="px-6 py-4 font-medium">
              {{ item.name }}
            </td>
            <td class="px-6 py-4">
              {{ item.qty }}
            </td>
            <td class="px-6 py-4 text-right">
              {{ formatCurrency(item.price) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <!-- Timeline -->
    <div class="rounded-lg border border-(--border-color) bg-(--body-bg-alt) p-6">
      <h3 class="font-semibold mb-6">Order Timeline</h3>

      <div class="relative space-y-6">
        <!-- Vertical line -->
        <div class="absolute left-2 top-2 bottom-2 w-px bg-(--border-color)" />

        <div
          v-for="(t) in timeline"
          :key="t.label"
          class="relative flex gap-4"
        >
          <!-- Dot -->
          <div
            class="h-4 w-4 rounded-full bg-(--primary)
                  ring-4 ring-(--primary-soft) z-10"
          />

          <!-- Content -->
          <div class="pb-2">
            <p class="font-medium text-(--body-color)">
              {{ t.label }}
            </p>
            <p class="text-xs text-(--muted) mt-0.5">
              {{ formatDate(t.date) }}
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.card {
  border: 1px solid var(--border-color);
  background: var(--body-bg-alt);
  border-radius: 0.75rem;
  padding: 1.5rem;
}
.card-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
</style>
