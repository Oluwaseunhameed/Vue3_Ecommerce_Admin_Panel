<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <section class="space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-xl font-semibold">{{ title }}</h1>
      <p v-if="description" class="text-sm text-muted mt-1">
        {{ description }}
      </p>
    </div>

    <!-- Page Content -->
    <div class="rounded-md bg-body-alt shadow-phoenix p-6">
      <slot />
    </div>
  </section>
</template>
