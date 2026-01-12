<script lang="ts">
import { defineComponent } from "vue";
import { Dialog } from "@headlessui/vue";

export default defineComponent({
  name: "BaseModal",
  props: {
    modelValue: { type: Boolean, required: true },
    title: { type: String, default: "" },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const close = () => emit("update:modelValue", false);
    return { Dialog, close, props };
  },
});
</script>

<template>
  <transition name="fade-scale" appear>
    <Dialog
      v-if="modelValue"
      as="div"
      class="fixed inset-0 z-50 overflow-y-auto"
      @close="close"
    >
      <div class="min-h-screen px-4 text-center">
        <!-- Overlay -->
        <transition name="fade" appear>
          <Dialog.Overlay class="fixed inset-0 bg-black/30" />
        </transition>

        <!-- Centering hack -->
        <span class="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

        <!-- Modal panel -->
        <transition name="fade-scale" appear>
          <div
            class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle
                   transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl"
          >
            <Dialog.Title class="text-lg font-medium text-gray-900 dark:text-gray-100">
              {{ title }}
            </Dialog.Title>

            <div class="mt-2">
              <slot />
            </div>

            <div class="mt-4 flex justify-end space-x-2">
              <button class="btn btn-secondary" @click="close">Close</button>
            </div>
          </div>
        </transition>
      </div>
    </Dialog>
  </transition>
</template>

<style scoped>
/* Fade for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Fade + scale for modal panel */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
