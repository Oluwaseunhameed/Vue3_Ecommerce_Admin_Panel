<script setup lang="ts">
  import { ArrowUp, ArrowDown } from 'lucide-vue-next'
import KpiCard from '@/components/dashboard/KpiCard.vue'
import RevenueChart from '@/components/dashboard/RevenueChart.vue'
import TopProductsTable from '@/components/dashboard/TopProductsTable.vue'
import LatestOrdersTable from '@/components/dashboard/LatestOrdersTable.vue'
import OrdersOverviewCard from '@/components/dashboard/OrdersOverviewCard.vue'
import CustomersOverviewCard from '@/components/dashboard/CustomersOverviewCard.vue'
import SalesSummaryCard from '@/components/dashboard/SalesSummaryCard.vue'
import TrafficOverviewCard from '@/components/dashboard/TrafficOverviewCard.vue'
import FunnelChart from '@/components/dashboard/FunnelChart.vue'
import CustomerTable from '@/components/table/CustomerTable.vue'
import OrdersTable from '@/components/table/OrdersTable.vue'
import {
  kpis,
  revenueSeries,
  topProducts,
  latestOrders,
  ordersOverview,
  customersOverview,
  salesSummary
} from '@/db/dashboard.mock'

const trafficStats = [
  { label: 'Visitors', value: '15,245', trend: '+5%', trendIcon: ArrowUp },
  { label: 'Sessions', value: '10,124', trend: '+8%', trendIcon: ArrowUp },
  { label: 'Bounce Rate', value: '35%', trend: '-2%', trendIcon: ArrowDown }
]

const funnelStages = [
  { name: 'Visitors', value: 1000 },
  { name: 'Leads', value: 600 },
  { name: 'Sign-ups', value: 400 },
  { name: 'Customers', value: 150 }
]

const customers = [
  { id: '#C1021', name: 'Alice Johnson', email: 'alice@example.com', status: 'Active' },
  { id: '#C1022', name: 'Bob Smith', email: 'bob@example.com', status: 'Inactive' }
]

const orders = [
  { id: '#O10245', customer: 'John Doe', total: '$245', status: 'Completed' },
  { id: '#O10246', customer: 'Jane Smith', total: '$180', status: 'Pending' }
]
</script>

<template>
  <section class="space-y-6">
    <!-- KPI CARDS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <KpiCard
        v-for="kpi in kpis"
        :key="kpi.label"
        v-bind="kpi"
      />
    </div>

    <!-- OVERVIEW CARDS -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <OrdersOverviewCard v-bind="ordersOverview" />
      <CustomersOverviewCard v-bind="customersOverview" />
      <SalesSummaryCard v-bind="salesSummary" />
    </div>

    <!-- REVENUE CHART -->
    <div class="rounded-xl border border-(--border-color) bg-(--body-bg-alt) p-4">
      <RevenueChart :series="revenueSeries" />
    </div>

    <!-- TRAFFIC CARDS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      <TrafficOverviewCard v-for="t in trafficStats" :key="t.label" v-bind="t" />
    </div>

    <!-- FUNNEL CHART -->
    <div class="rounded-xl border border-(--border-color) bg-(--body-bg-alt) p-4">
      <h3 class="font-semibold mb-4">Conversion Funnel</h3>
      <FunnelChart :stages="funnelStages" />
    </div>

    <!-- TABLES: TOP PRODUCTS & LATEST ORDERS -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <TopProductsTable :items="topProducts" />
      <LatestOrdersTable :items="latestOrders" />
    </div>

    <!-- CUSTOMERS & ORDERS INSIGHTS TABLES -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <CustomerTable :customers="customers" />
      <OrdersTable :orders="orders" />
    </div>

  </section>
</template>
