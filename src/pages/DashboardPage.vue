<script setup lang="ts">
import PageShell from "@/components/layout/PageShell.vue";
import { useTheme } from "@/composables/useTheme";

useTheme();
</script>

<template>
  <PageShell
    title="Dashboard"
    description="Ecommerce overview & performance snapshot"
  >
    <p class="text-sm text-muted">
      Charts, KPIs, and activity feed will live here.
    </p>
  </PageShell>
</template>
