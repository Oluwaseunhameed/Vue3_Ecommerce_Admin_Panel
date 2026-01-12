import { db } from "./db";
import { v4 as uuid } from "uuid";
import type { Customer } from "@/types/customer";
import type { Order } from "@/types/order";

export async function seedDatabase(): Promise<void> {
  // If tables already have 12 or more records, skip
  const customersCount = await db.customers.count();
  const ordersCount = await db.orders.count();
  if (customersCount >= 12 && ordersCount >= 12) return;

  // Clear existing data to avoid duplicates
  await db.customers.clear();
  await db.orders.clear();

  const now = new Date();

  // 12 customers
  const customers: Omit<Customer, "id" | "createdAt">[] = [
    { name: "John Doe", email: "john@example.com", status: "active" },
    { name: "Jane Smith", email: "jane@example.com", status: "inactive" },
    { name: "Michael Brown", email: "michael@example.com", status: "active" },
    { name: "Sarah Johnson", email: "sarah@example.com", status: "active" },
    { name: "David Wilson", email: "david@example.com", status: "inactive" },
    { name: "Emily Davis", email: "emily@example.com", status: "active" },
    { name: "Daniel Miller", email: "daniel@example.com", status: "active" },
    { name: "Olivia Garcia", email: "olivia@example.com", status: "active" },
    { name: "James Martinez", email: "james@example.com", status: "inactive" },
    { name: "Sophia Anderson", email: "sophia@example.com", status: "active" },
    {
      name: "Benjamin Thomas",
      email: "benjamin@example.com",
      status: "active",
    },
    { name: "Ava Taylor", email: "ava@example.com", status: "inactive" },
  ];

  const customerRecords: Customer[] = customers.map((c) => ({
    id: uuid(),
    createdAt: now,
    ...c,
  }));

  await db.customers.bulkAdd(customerRecords);

  // Order totals & statuses
  const ORDER_TOTALS = [49.99, 99.99, 149.99, 199.99, 249.99, 299.99] as const;
  const ORDER_STATUSES: Order["status"][] = ["paid", "pending", "failed"];

  // 12 orders (one per customer)
  const orders: Order[] = customerRecords.map((customer, index) => ({
    id: uuid(),
    customerId: customer.id,
    total: ORDER_TOTALS[index % ORDER_TOTALS.length] as number,
    status: ORDER_STATUSES[index % ORDER_STATUSES.length]!,
    createdAt: now,
  }));

  await db.orders.bulkAdd(orders);

  console.log("✅ Database seeded with 12 customers and 12 orders");
}
