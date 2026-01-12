import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-vue-next";

export const kpis = [
  { label: "Revenue", value: "$84,245", trend: "+12%", icon: DollarSign },
  { label: "Orders", value: "1,245", trend: "+8%", icon: ShoppingCart },
  { label: "Customers", value: "3,245", trend: "+5%", icon: Users },
  { label: "Growth", value: "18%", trend: "+2%", icon: TrendingUp },
];

export const revenueSeries = [12000, 15000, 18000, 16000, 21000, 24000];

export const topProducts = [
  { name: "iPhone 15", sales: 1245 },
  { name: "MacBook Pro", sales: 980 },
  { name: "AirPods Pro", sales: 870 },
];

export const latestOrders = [
  { id: "#10245", customer: "John Doe", total: "$245", status: "Completed" },
  { id: "#10246", customer: "Jane Smith", total: "$180", status: "Completed" },
];

export const ordersOverview = {
  completed: 984,
  pending: 182,
  refunded: 24,
};

export const customersOverview = {
  total: 3245,
  newThisMonth: 148,
  churnRate: "2.4%",
};

export const salesSummary = {
  thisMonth: "$84,245",
  lastMonth: "$76,120",
  growth: "+10.6%",
};
