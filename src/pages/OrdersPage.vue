<script setup lang="ts">
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { v4 as uuid } from "uuid"
import { formatDate, formatCurrency } from "@/utils/formatters"
import { FileText, Eye } from "lucide-vue-next"

type OrderStatus = "pending" | "processing" | "completed" | "cancelled"

interface Order {
  id: string
  customer: string
  email: string
  total: number
  status: OrderStatus
  createdAt: Date
}

const router = useRouter()

/* ---------------- MOCK DATA ---------------- */
const orders = ref<Order[]>([
  {
    id: uuid(),
    customer: "John Carter",
    email: "john@example.com",
    total: 1240,
    status: "completed",
    createdAt: new Date("2024-01-12"),
  },
  {
    id: uuid(),
    customer: "Amina Yusuf",
    email: "amina@example.com",
    total: 420,
    status: "pending",
    createdAt: new Date("2024-02-05"),
  },
  {
    id: uuid(),
    customer: "Marco Rossi",
    email: "marco@example.com",
    total: 890,
    status: "processing",
    createdAt: new Date("2024-02-18"),
  },
])

/* ---------------- FILTERS ---------------- */
const filters = ref({
  status: "all",
  from: "",
  to: "",
})

/* ---------------- BULK SELECTION ---------------- */
const selected = ref<string[]>([])

const allSelected = computed({
  get: () => selected.value.length === filteredOrders.value.length,
  set: (val) => {
    selected.value = val ? filteredOrders.value.map(o => o.id) : []
  },
})

/* ---------------- FILTER LOGIC ---------------- */
const filteredOrders = computed(() =>
  orders.value.filter(o => {
    if (filters.value.status !== "all" && o.status !== filters.value.status)
      return false

    if (filters.value.from && o.createdAt < new Date(filters.value.from))
      return false

    if (filters.value.to && o.createdAt > new Date(filters.value.to))
      return false

    return true
  })
)

/* ---------------- EXPORT ---------------- */
function exportCSV() {
  const rows = [
    ["Customer", "Email", "Total", "Status", "Date"],
    ...filteredOrders.value.map(o => [
      o.customer,
      o.email,
      o.total,
      o.status,
      formatDate(o.createdAt),
    ]),
  ]
    .map(r => r.join(","))
    .join("\n")

  const blob = new Blob([rows], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "orders.csv"
  a.click()
}
</script>

<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold">Orders</h1>

      <button
        @click="exportCSV"
        class="flex items-center gap-2 rounded-md border border-(--border-color)
               px-4 py-2 bg-body-bg-alt hover:bg-primary-soft"
      >
        <FileText class="h-4 w-4" />
        Export
      </button>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4">
      <select v-model="filters.status" class="filter-control">
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <input type="date" v-model="filters.from" class="filter-control" />
      <input type="date" v-model="filters.to" class="filter-control" />
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-lg border border-(--border-color) bg-body-bg-alt">
      <table class="w-full text-md">
        <thead class="bg-body-bg">
          <tr>
            <th class="px-4 py-3 text-left">
              <input type="checkbox" v-model="allSelected" />
            </th>
            <th class="px-4 py-3 text-left">Customer</th>
            <th class="px-4 py-3 text-left">Total</th>
            <th class="px-4 py-3 text-left">Status</th>
            <th class="px-4 py-3 text-left">Date</th>
            <th class="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="o in filteredOrders"
            :key="o.id"
            class="group border-t border-(--border-color)
                  hover:bg-body-bg transition cursor-pointer"
            @click="router.push(`/orders/${o.id}`)"
          >
            <td class="px-4 py-3">
              <input
                type="checkbox"
                v-model="selected"
                :value="o.id"
                @click.stop
              />
            </td>

            <td class="px-4 py-3 font-medium">
              <div>{{ o.customer }}</div>
              <div class="text-xs text-muted">{{ o.email }}</div>
            </td>

            <td class="px-4 py-3">
              {{ formatCurrency(o.total) }}
            </td>

            <td class="px-4 py-3">
              <span
                class="rounded-full px-2 py-1 text-xs capitalize"
                :class="{
                  'bg-success/10 text-success': o.status === 'completed',
                  'bg-warning/10 text-warning': o.status === 'pending',
                  'bg-primary-soft text-primary': o.status === 'processing',
                  'bg-danger/10 text-danger': o.status === 'cancelled',
                }"
              >
                {{ o.status }}
              </span>
            </td>

            <td class="px-4 py-3">
              {{ formatDate(o.createdAt) }}
            </td>

            <!-- Action -->
            <td class="px-4 py-3 text-right">
              <button
                title="View order details"
                class="inline-flex items-center justify-center
                      h-8 w-8 rounded-md
                      border border-(--border-color)
                      text-body-color
                      hover:bg-primary-soft hover:text-primary
                      transition"
                @click.stop="router.push(`/orders/${o.id}`)"
              >
                <Eye class="h-4 w-4 cursor-pointer" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.filter-control {
  height: 42px;
  border-radius: 0.375rem;
  border: 1px solid var(--border-color);
  background: var(--body-bg-alt);
  padding: 0 0.75rem;
}
</style>
