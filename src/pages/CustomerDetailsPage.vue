<script setup lang="ts">
import { useRoute } from "vue-router";
import PageShell from "@/components/layout/PageShell.vue";

const route = useRoute();
</script>

<template>
  <PageShell
    title="Customer Details"
    description="Customer profile & order history"
  >
    <p class="text-sm text-muted">
      Viewing customer ID: <strong>{{ route.params.id }}</strong>
    </p>
  </PageShell>
</template>
