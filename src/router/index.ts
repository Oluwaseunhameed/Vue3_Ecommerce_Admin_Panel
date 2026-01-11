// src/router/index.ts
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import AppLayout from "@/components/layout/AppLayout.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("@/pages/DashboardPage.vue"),
        meta: { title: "Dashboard" },
      },
      // {
      //   path: "add-product",
      //   name: "add-product",
      //   component: () => import("@/pages/AddProductPage.vue"),
      //   meta: { title: "Add Product" },
      // },
      // {
      //   path: "products",
      //   name: "products",
      //   component: () => import("@/pages/ProductsPage.vue"),
      //   meta: { title: "Products" },
      // },
      // {
      //   path: "orders",
      //   name: "orders",
      //   component: () => import("@/pages/OrdersPage.vue"),
      //   meta: { title: "Orders" },
      // },
      // {
      //   path: "order-details",
      //   name: "order-details",
      //   component: () => import("@/pages/OrderDetailsPage.vue"),
      //   meta: { title: "Order Details" },
      // },
      // {
      //   path: "customers",
      //   name: "customers",
      //   component: () => import("@/pages/CustomersPage.vue"),
      //   meta: { title: "Customers" },
      // },
      // {
      //   path: "customer-details",
      //   name: "customer-details",
      //   component: () => import("@/pages/CustomerDetailsPage.vue"),
      //   meta: { title: "Customer Details" },
      // },
      // {
      //   path: "refund",
      //   name: "refund",
      //   component: () => import("@/pages/RefundPage.vue"),
      //   meta: { title: "Refund" },
      // },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});
