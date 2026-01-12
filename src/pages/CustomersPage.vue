<script setup lang="ts">
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { v4 as uuid } from "uuid"
import type { Customer } from "@/types/customer"
import { formatCurrency } from "@/utils/formatters"
import { Eye } from "lucide-vue-next"

const router = useRouter()

const customers = ref<Customer[]>([
  {
    id: uuid(),
    name: "John Carter",
    email: "john@example.com",
    country: "USA",
    isVIP: true,
    totalOrders: 18,
    totalSpent: 12450,
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=1",
    joinedAt: new Date("2023-01-12"),
  },
  {
    id: uuid(),
    name: "Amina Yusuf",
    email: "amina@example.com",
    country: "Nigeria",
    isVIP: false,
    totalOrders: 6,
    totalSpent: 2140,
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=2",
    joinedAt: new Date("2023-08-22"),
  },
  {
    id: uuid(),
    name: "Marco Rossi",
    email: "marco@example.com",
    country: "Italy",
    isVIP: true,
    totalOrders: 24,
    totalSpent: 18700,
    status: "inactive",
    avatar: "https://i.pravatar.cc/150?img=3",
    joinedAt: new Date("2022-11-05"),
  },
])

const filters = ref({
  segment: "all",
  country: "all",
})

const filteredCustomers = computed(() =>
  customers.value.filter(c => {
    if (filters.value.segment === "vip" && !c.isVIP) return false
    if (filters.value.segment === "active" && c.status !== "active") return false
    if (filters.value.country !== "all" && c.country !== filters.value.country)
      return false
    return true
  })
)
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold text-body-color">Customers</h1>

      <button
        class="rounded-md border border-(--border-color)
               px-4 py-2 text-sm
               bg-body-bg-alt hover:bg-primary-soft"
      >
        Export
      </button>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4">
      <select v-model="filters.segment" class="filter-control">
        <option value="all">All Customers</option>
        <option value="vip">VIP</option>
        <option value="active">Active</option>
      </select>

      <select v-model="filters.country" class="filter-control">
        <option value="all">All Countries</option>
        <option value="USA">USA</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Italy">Italy</option>
      </select>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-lg border border-(--border-color) bg-body-bg-alt">
      <table class="w-full text-md">
        <thead class="bg-body-bg">
          <tr>
            <th class="px-4 py-3 text-left">Customer</th>
            <th class="px-4 py-3 text-left">Email</th>
            <th class="px-4 py-3 text-left">Country</th>
            <th class="px-4 py-3 text-left">Orders</th>
            <th class="px-4 py-3 text-left">Spent</th>
            <th class="px-4 py-3 text-left">Status</th>
            <th class="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="c in filteredCustomers"
            :key="c.id"
            class="group border-t border-(--border-color)
                   hover:bg-body-bg transition cursor-pointer"
            @click="router.push(`/customers/${c.id}`)"
          >
            <td class="flex items-center gap-3 px-4 py-3">
              <img :src="c.avatar" class="h-9 w-9 rounded-full" />
              <span class="font-medium">{{ c.name }}</span>
            </td>

            <td class="px-4 py-3">{{ c.email }}</td>
            <td class="px-4 py-3">{{ c.country }}</td>
            <td class="px-4 py-3">{{ c.totalOrders }}</td>
            <td class="px-4 py-3">{{ formatCurrency(c.totalSpent) }}</td>

            <td class="px-4 py-3">
              <span
                class="rounded-full px-2 py-1 text-xs capitalize"
                :class="c.status === 'active'
                  ? 'bg-success/10 text-success'
                  : 'bg-danger/10 text-danger'"
              >
                {{ c.status }}
              </span>
            </td>

            <!-- Action -->
            <td class="px-4 py-3 text-right">
              <button
                title="View customer details"
                class="inline-flex items-center justify-center
                       h-8 w-8 rounded-md
                       border border-(--border-color)
                       text-body-color
                       hover:bg-primary-soft hover:text-primary
                       transition"
                @click.stop="router.push(`/customers/${c.id}`)"
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

