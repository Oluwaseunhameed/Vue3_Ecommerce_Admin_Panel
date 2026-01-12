<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { cva } from "class-variance-authority";
import clsx from "clsx";

// CVA variants
const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export default defineComponent({
  name: "BaseButton",
  props: {
    variant: { type: String as PropType<"primary" | "secondary" | "ghost">, default: "primary" },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
    as: { type: String as PropType<"button" | "a">, default: "button" },
    disabled: { type: Boolean, default: false },
  },
  setup(props) {
    return { buttonVariants, clsx, props };
  },
});
</script>

<template>
  <component
    :is="props.as"
    :class="clsx(buttonVariants({ variant: props.variant, size: props.size }))"
    :disabled="props.as === 'button' ? props.disabled : undefined"
  >
    <slot />
  </component>
</template>
