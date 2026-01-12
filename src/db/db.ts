import Dexie, { type Table } from "dexie";
import type { Customer } from "@/types/customer";
import type { Order } from "@/types/order";

class AppDatabase extends Dexie {
  customers!: Table<Customer, string>;
  orders!: Table<Order, string>;

  constructor() {
    super("oh-ecommerce-db");

    this.version(1).stores({
      customers: "id, email, status, createdAt",
      orders: "id, customerId, status, createdAt",
    });
  }
}

export const db = new AppDatabase();
