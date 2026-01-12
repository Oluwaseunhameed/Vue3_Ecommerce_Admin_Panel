<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseCard",
});
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
    <slot />
  </div>
</template>
