<script setup lang="ts">
import { computed, ref } from "vue"
import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from "@headlessui/vue"
import { HelpCircle, RotateCcw } from "lucide-vue-next"
import { formatCurrency } from "@/utils/formatters"

interface RefundItem {
  id: string
  name: string
  price: number
  purchasedQty: number
  refundableQty: number
  refundQty: number
}


const items = ref<RefundItem[]>([
  {
    id: "1",
    name: "Wireless Headphones",
    price: 320,
    purchasedQty: 1,
    refundableQty: 1,
    refundQty: 0,
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    price: 299,
    purchasedQty: 2,
    refundableQty: 2,
    refundQty: 0,
  },
])

const refundableItems = computed(() =>
  items.value.filter(i => i.refundableQty > 0)
)

const refundTotal = computed(() =>
  refundableItems.value.reduce(
    (sum, i) => sum + i.refundQty * i.price,
    0
  )
)

const canRefund = computed(() => refundTotal.value > 0)

const confirmOpen = ref(false)

function openConfirm() {
  if (canRefund.value) confirmOpen.value = true
}

function issueRefund() {
  confirmOpen.value = false

  // Simulated API call
  console.log("Refund issued:", {
    items: refundableItems.value
      .filter(i => i.refundQty > 0)
      .map(i => ({
        id: i.id,
        qty: i.refundQty,
        amount: i.refundQty * i.price,
      })),
    total: refundTotal.value,
  })

  // Reset state
  items.value.forEach(i => (i.refundQty = 0))
}
</script>

<template>
  <div class="space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold">Refund</h1>
      <span class="text-md text-muted">
        Select items and quantities to refund
      </span>
    </div>

    <!-- Refundable Items -->
    <div class="rounded-lg border border-(--border-color) bg-body-bg-alt">
      <table class="w-full text-md">
        <thead class="bg-body-bg">
          <tr>
            <th class="px-6 py-3 text-left">Item</th>
            <th class="px-6 py-3 text-center">Purchased</th>
            <th class="px-6 py-3 text-center">Refundable</th>
            <th class="px-6 py-3 text-center">Refund Qty</th>
            <th class="px-6 py-3 text-right">Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in refundableItems"
            :key="item.id"
            class="border-t border-(--border-color)"
          >
            <td class="px-6 py-4 font-medium">
              {{ item.name }}
            </td>

            <td class="px-6 py-4 text-center">
              {{ item.purchasedQty }}
            </td>

            <td class="px-6 py-4 text-center">
              {{ item.refundableQty }}
            </td>

            <td class="px-6 py-4 text-center">
              <input
                type="number"
                min="0"
                :max="item.refundableQty"
                v-model.number="item.refundQty"
                class="w-20 rounded-md border border-(--border-color)
                       bg-body-bg px-2 py-1 text-center"
              />
            </td>

            <td class="px-6 py-4 text-right">
              {{ formatCurrency(item.refundQty * item.price) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Summary -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="text-md">
        <span class="text-muted">Refund total:</span>
        <span class="ml-2 font-semibold">
          {{ formatCurrency(refundTotal) }}
        </span>
      </div>

      <button
        :disabled="!canRefund"
        @click="openConfirm"
        class="inline-flex items-center gap-2 rounded-md
               bg-(--primary) px-4 py-2 text-white
               disabled:opacity-50 disabled:cursor-not-allowed
               hover:bg-(--primary)/90 transition"
      >
        <RotateCcw class="h-4 w-4" />
        Issue Refund
      </button>
    </div>

    <!-- Support Widget -->
    <div
      class="flex items-start gap-4 rounded-lg
             border border-(--border-color)
             bg-body-bg-alt p-4"
    >
      <HelpCircle class="h-5 w-5 text-primary mt-0.5" />
      <div>
        <p class="font-medium">Need help with refunds?</p>
        <p class="text-md text-muted">
          Contact support if the customer paid outside the system or if items
          are not refundable.
        </p>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <TransitionRoot appear :show="confirmOpen" as="template">
      <Dialog as="div" class="relative z-50" @close="confirmOpen = false">
        <div class="fixed inset-0 bg-black/30" />

        <div class="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            class="w-full max-w-md rounded-xl bg-(--body-bg)
                   border border-(--border-color) p-6"
          >
            <DialogTitle class="text-lg font-semibold">
              Confirm Refund
            </DialogTitle>

            <p class="mt-2 text-md text-(--muted)">
              You are about to issue a refund of
              <strong>{{ formatCurrency(refundTotal) }}</strong>.
              This action cannot be undone.
            </p>

            <div class="mt-6 flex justify-end gap-3">
              <button
                class="rounded-md border border-(--border-color)
                       px-4 py-2 hover:bg-(--body-bg) cursor-pointer"
                @click="confirmOpen = false"
              >
                Cancel
              </button>

              <button
                class="rounded-md bg-(--danger) px-4 py-2 text-white
                       hover:bg-(--danger)/90 cursor-pointer"
                @click="issueRefund"
              >
                Confirm Refund
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </TransitionRoot>

  </div>
</template>
