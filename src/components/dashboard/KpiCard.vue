<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Component } from 'vue'

const props = defineProps<{
  label: string
  value: string
  trend?: string
  icon?: Component
}>()

const animatedValue = ref('0')

onMounted(() => {
  const numericValue = Number(props.value.replace(/[^0-9.-]+/g,""))
  let current = 0
  const increment = numericValue / 60 // animate in ~1s at 60fps
  const interval = setInterval(() => {
    current += increment
    if (current >= numericValue) {
      animatedValue.value = props.value
      clearInterval(interval)
    } else {
      animatedValue.value = `$${Math.floor(current).toLocaleString()}`
    }
  }, 16)
})
</script>


<template>
  <div
    class="rounded-xl border border-(--border-color) bg-(--body-bg-alt) p-4 flex items-center justify-between transition-transform hover:scale-[1.02]"
  >
    <div>
      <p class="text-sm text-muted">{{ label }}</p>
      <h3 class="text-2xl font-semibold mt-1">{{ animatedValue }}</h3>
      <p v-if="trend" class="text-sm text-success mt-1">{{ trend }}</p>
    </div>

    <component
      v-if="icon"
      :is="icon"
      class="w-8 h-8 text-primary"
    />
  </div>
</template>
