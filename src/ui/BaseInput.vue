<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "BaseInput",
  props: {
    modelValue: { type: [String, Number] as PropType<string | number>, default: "" },
    type: { type: String as PropType<"text" | "email" | "password" | "number">, default: "text" },
    placeholder: { type: String, default: "" },
    disabled: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const onInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      emit("update:modelValue", target.value);
    };
    return { onInput, props };
  },
});
</script>

<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="modelValue"
    @input="onInput"
    class="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  />
</template>
