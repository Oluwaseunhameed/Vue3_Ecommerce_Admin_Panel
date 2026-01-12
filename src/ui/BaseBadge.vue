<script lang="ts">
import { defineComponent, computed, type PropType } from "vue";

export default defineComponent({
  name: "BaseBadge",
  props: {
    variant: {
      type: String as PropType<"success" | "warning" | "error" | "info">,
      default: "info",
    },
  },
  setup(props) {
    // Use props.variant inside computed
    const classes = computed(() => {
      const colors: Record<string, string> = {
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800",
        info: "bg-blue-100 text-blue-800",
      };
      return `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors[props.variant]}`;
    });

    return { classes };
  },
});
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
