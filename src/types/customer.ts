export interface Customer {
  id: string;
  name: string;
  email: string;
  country: string;
  isVIP: boolean;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "inactive";
  avatar: string;
  joinedAt: Date;
}

export interface Order {
  id: string;
  date: Date;
  amount: number;
  status: "completed" | "pending" | "cancelled";
}
