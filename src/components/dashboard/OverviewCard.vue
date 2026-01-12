<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div
    class="rounded-xl border border-(--border-color)
           bg-(--body-bg-alt)
           p-4 space-y-4"
  >
    <!-- Header -->
    <div>
      <h3 class="font-semibold text-sm">{{ title }}</h3>
      <p v-if="subtitle" class="text-xs text-muted mt-0.5">
        {{ subtitle }}
      </p>
    </div>

    <!-- Content -->
    <div>
      <slot />
    </div>
  </div>
</template>
