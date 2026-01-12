<script lang="ts">
import { defineComponent } from "vue";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

export default defineComponent({
  name: "BaseTooltip",
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
    TransitionRoot,
    TransitionChild,
  },
});
</script>
<template>
  <Popover class="relative">
    <PopoverButton>
      <slot name="trigger" />
    </PopoverButton>

    <TransitionRoot>
      <TransitionChild
        enter="transition ease-out duration-200"
        enter-from="opacity-0 translate-y-1"
        enter-to="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leave-from="opacity-100 translate-y-0"
        leave-to="opacity-0 translate-y-1"
      >
        <PopoverPanel
          class="absolute z-10 bg-gray-900 text-white text-xs rounded px-2 py-1 shadow-lg"
        >
          <slot name="content" />
        </PopoverPanel>
      </TransitionChild>
    </TransitionRoot>
  </Popover>
</template>

