<template>
  <main
    class="flex-1 overflow-y-auto p-6 transition-all duration-300 bg-body min-h-screen"
  >
    <div class="max-w-400 mx-auto space-y-6">
      <router-view />
    </div>
  </main>
</template>

<script setup lang="ts">

const props = defineProps<{ isCollapsed: boolean }>()

</script>

<style scoped>
@media (max-width: 1024px) {
  main {
    margin-left: 0 !important;
  }
}
</style>
