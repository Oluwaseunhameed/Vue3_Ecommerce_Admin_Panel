import type { Component } from "vue";
import {
  Home,
  PlusCircle,
  Package,
  Users,
  ShoppingCart,
  CreditCard,
  RefreshCcw,
} from "lucide-vue-next";

export interface NavItem {
  label: string;
  routeName?: string;
  icon?: Component;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { label: "Dashboard", routeName: "dashboard", icon: Home },
  { label: "Add Product", routeName: "add-product", icon: PlusCircle },
  { label: "Products", routeName: "products", icon: Package },
  { label: "Customers", routeName: "customers", icon: Users },
  { label: "Customer details", routeName: "customer-details", icon: Users },
  { label: "Orders", routeName: "orders", icon: ShoppingCart },
  { label: "Order details", routeName: "order-details", icon: CreditCard },
  { label: "Refund", routeName: "refund", icon: RefreshCcw },
];
