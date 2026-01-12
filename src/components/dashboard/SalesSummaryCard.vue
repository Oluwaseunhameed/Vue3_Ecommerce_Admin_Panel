<script setup lang="ts">
import OverviewCard from './OverviewCard.vue'

defineProps<{
  thisMonth: string
  lastMonth: string
  growth: string
}>()
</script>

<template>
  <OverviewCard
    title="Sales Summary"
    subtitle="Monthly comparison"
  >
    <div class="space-y-3 text-sm">
      <div class="flex justify-between">
        <span class="text-muted">This Month</span>
        <span class="font-medium">{{ thisMonth }}</span>
      </div>

      <div class="flex justify-between">
        <span class="text-muted">Last Month</span>
        <span class="font-medium">{{ lastMonth }}</span>
      </div>

      <div class="flex justify-between">
        <span class="text-muted">Growth</span>
        <span class="font-medium text-success">
          {{ growth }}
        </span>
      </div>
    </div>
  </OverviewCard>
</template>
