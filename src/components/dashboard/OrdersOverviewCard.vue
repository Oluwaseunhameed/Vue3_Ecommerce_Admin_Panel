<script setup lang="ts">
import OverviewCard from './OverviewCard.vue'

defineProps<{
  completed: number
  pending: number
  refunded: number
}>()
</script>

<template>
  <OverviewCard
    title="Orders Overview"
    subtitle="Order status breakdown"
  >
    <div class="space-y-3 text-sm">
      <div class="flex justify-between">
        <span class="text-muted">Completed</span>
        <span class="font-medium text-success">
          {{ completed }}
        </span>
      </div>

      <div class="flex justify-between">
        <span class="text-muted">Pending</span>
        <span class="font-medium text-warning">
          {{ pending }}
        </span>
      </div>

      <div class="flex justify-between">
        <span class="text-muted">Refunded</span>
        <span class="font-medium text-danger">
          {{ refunded }}
        </span>
      </div>
    </div>
  </OverviewCard>
</template>
