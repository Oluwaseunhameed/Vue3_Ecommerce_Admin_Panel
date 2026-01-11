<script setup lang="ts">
import { useRoute } from "vue-router";
import PageShell from "@/components/layout/PageShell.vue";

const route = useRoute();
</script>

<template>
  <PageShell
    title="Order Details"
    description="Detailed order information"
  >
    <p class="text-sm text-muted">
      Viewing order ID: <strong>{{ route.params.id }}</strong>
    </p>
  </PageShell>
</template>
