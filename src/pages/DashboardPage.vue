<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
useTheme()
</script>

<template>
  <main class="flex-1 p-6">
    <div class="rounded-phoenix bg-body-alt shadow-phoenix p-6">
      <h1 class="text-2xl font-semibold mb-2">Dashboard</h1>
      <p class="text-sm text-gray-500">Phoenix UI Loaded with sidebar & header!</p>
    </div>
  </main>
</template>
