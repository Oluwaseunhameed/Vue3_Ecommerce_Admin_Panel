export interface Order {
  id: string;
  customerId: string;
  total: number;
  status: "pending" | "paid" | "failed";
  createdAt: Date;
}
