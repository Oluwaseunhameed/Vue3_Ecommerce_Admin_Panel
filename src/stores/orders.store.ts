import { defineStore } from "pinia";
import { ref } from "vue";
import { db } from "@/db/db";
import type { Order } from "@/types/order";

export const useOrdersStore = defineStore("orders", () => {
  const orders = ref<Order[]>([]);
  const loading = ref(false);

  async function fetchAll(): Promise<void> {
    loading.value = true;
    orders.value = await db.orders.toArray();
    loading.value = false;
  }

  return { orders, loading, fetchAll };
});
