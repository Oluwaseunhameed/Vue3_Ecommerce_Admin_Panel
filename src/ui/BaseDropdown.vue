<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { Menu } from "@headlessui/vue";

export default defineComponent({
  name: "BaseDropdown",
  props: {
    items: {
      type: Array as PropType<Array<{ label: string; value: any }>>,
      required: true,
    },
    modelValue: { type: Object as PropType<{ label: string; value: any } | null>, default: null },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const selectItem = (item: { label: string; value: any }) => emit("update:modelValue", item);
    return { Menu, props, selectItem };
  },
});
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <Menu.Button
      class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {{ props.modelValue?.label || "Select..." }}
    </Menu.Button>

    <Menu.Items
      class="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-50
      transition ease-out duration-100 transform opacity-0 scale-95"
      v-show="props.items.length > 0"
    >
      <div class="py-1">
        <Menu.Item v-for="item in props.items" :key="item.value" v-slot="{ active }">
          <button
            @click="selectItem(item)"
            :class="[
              'group flex w-full items-center px-4 py-2 text-sm',
              active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
            ]"
          >
            {{ item.label }}
          </button>
        </Menu.Item>
      </div>
    </Menu.Items>
  </Menu>
</template>
