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
      {
        path: "products",
        name: "products",
        component: () => import("@/pages/ProductsPage.vue"),
        meta: { title: "Products" },
      },
      {
        path: "products/new",
        name: "add-product",
        component: () => import("@/pages/AddProductPage.vue"),
        meta: { title: "Add Product" },
      },
      {
        path: "orders",
        name: "orders",
        component: () => import("@/pages/OrdersPage.vue"),
        meta: { title: "Orders" },
      },
      {
        path: "orders/:id",
        name: "order-details",
        component: () => import("@/pages/OrderDetailsPage.vue"),
        meta: { title: "Order Details" },
      },
      {
        path: "customers",
        name: "customers",
        component: () => import("@/pages/CustomersPage.vue"),
        meta: { title: "Customers" },
      },
      {
        path: "customers/:id",
        name: "customer-details",
        component: () => import("@/pages/CustomerDetailsPage.vue"),
        meta: { title: "Customer Details" },
      },
      {
        path: "refunds",
        name: "refund",
        component: () => import("@/pages/RefundPage.vue"),
        meta: { title: "Refunds" },
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | OH_Store` : "OH_Store";
});
