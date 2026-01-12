<script setup lang="ts">
import OverviewCard from './OverviewCard.vue'

defineProps<{
  total: number
  newThisMonth: number
  churnRate: string
}>()
</script>

<template>
  <OverviewCard
    title="Customers"
    subtitle="Customer activity summary"
  >
    <div class="space-y-3 text-sm">
      <div class="flex justify-between">
        <span class="text-muted">Total Customers</span>
        <span class="font-medium">{{ total }}</span>
      </div>

      <div class="flex justify-between">
        <span class="text-muted">New this month</span>
        <span class="font-medium text-success">
          +{{ newThisMonth }}
        </span>
      </div>

      <div class="flex justify-between">
        <span class="text-muted">Churn Rate</span>
        <span class="font-medium text-danger">
          {{ churnRate }}
        </span>
      </div>
    </div>
  </OverviewCard>
</template>
