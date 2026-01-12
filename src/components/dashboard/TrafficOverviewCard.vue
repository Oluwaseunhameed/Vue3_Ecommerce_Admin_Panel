<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUp, ArrowDown } from 'lucide-vue-next'

type TrendIcon = typeof ArrowUp | typeof ArrowDown

interface TrafficOverviewProps {
  label: string
  value: string
  trend?: string
  trendIcon?: TrendIcon
}

const props = defineProps<TrafficOverviewProps>()

// Computed class for trend text color
const trendClass = computed(() => {
  if (!props.trendIcon) return ''
  return props.trendIcon === ArrowUp ? 'text-success' : 'text-destructive'
})
</script>

<template>
  <div
    class="rounded-xl border border-(--border-color) bg-(--body-bg-alt) p-4 flex items-center justify-between"
  >
    <div>
      <p class="text-sm text-muted">{{ props.label }}</p>
      <h3 class="text-2xl font-semibold mt-1">{{ props.value }}</h3>

      <p v-if="props.trend" class="text-sm mt-1" :class="trendClass">
        <component
          v-if="props.trendIcon"
          :is="props.trendIcon"
          class="w-4 h-4 inline-block mr-1"
        />
        {{ props.trend }}
      </p>
    </div>
  </div>
</template>
