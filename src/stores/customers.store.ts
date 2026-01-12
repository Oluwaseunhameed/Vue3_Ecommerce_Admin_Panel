import { defineStore } from "pinia";
import { ref } from "vue";
import { db } from "@/db/db";
import type { Customer } from "@/types/customer";

export const useCustomersStore = defineStore("customers", () => {
  const customers = ref<Customer[]>([]);
  const loading = ref(false);

  async function fetchAll(): Promise<void> {
    loading.value = true;
    customers.value = await db.customers.toArray();
    loading.value = false;
  }

  return { customers, loading, fetchAll };
});
