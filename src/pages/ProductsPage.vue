<script setup lang="ts">
import { ref, computed, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { Plus, Edit, Trash2, FileText } from "lucide-vue-next";
import { saveAs } from "file-saver";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";

/* ---------------- ROUTER ---------------- */
const router = useRouter();

/* ---------------- TYPES ---------------- */
interface Product {
  id: string;
  name: string;
  category: string;
  vendor: string;
  price: number;
  stock: number;
  thumbnail: string;
  createdAt: Date;
}

/* ---------------- MOCK DATA ---------------- */
const categories = ["Electronics", "Fashion", "Books", "Toys", "Home"];
const vendors = ["Vendor A", "Vendor B", "Vendor C"];

const allProducts = ref<Product[]>([
  {
    id: uuid(),
    name: "Smartphone X",
    category: "Electronics",
    vendor: "Vendor A",
    price: 899,
    stock: 25,
    thumbnail: "https://i.pravatar.cc/41",
    createdAt: new Date(),
  },
  {
    id: uuid(),
    name: "Running Shoes",
    category: "Fashion",
    vendor: "Vendor B",
    price: 120,
    stock: 0,
    thumbnail: "https://i.pravatar.cc/42",
    createdAt: new Date(),
  },
  {
    id: uuid(),
    name: "Wireless Headphones",
    category: "Electronics",
    vendor: "Vendor C",
    price: 199,
    stock: 18,
    thumbnail: "https://i.pravatar.cc/43",
    createdAt: new Date(),
  },
  {
    id: uuid(),
    name: "Smart Watch Pro",
    category: "Electronics",
    vendor: "Vendor A",
    price: 299,
    stock: 12,
    thumbnail: "https://i.pravatar.cc/44",
    createdAt: new Date(),
  },
  {
    id: uuid(),
    name: "Office Chair",
    category: "Home",
    vendor: "Vendor B",
    price: 180,
    stock: 7,
    thumbnail: "https://i.pravatar.cc/45",
    createdAt: new Date(),
  },
  {
    id: uuid(),
    name: "Bluetooth Speaker",
    category: "Electronics",
    vendor: "Vendor C",
    price: 89,
    stock: 30,
    thumbnail: "https://i.pravatar.cc/46",
    createdAt: new Date(),
  },
  {
    id: uuid(),
    name: "Classic Novel Set",
    category: "Books",
    vendor: "Vendor A",
    price: 65,
    stock: 0,
    thumbnail: "https://i.pravatar.cc/47",
    createdAt: new Date(),
  },
  {
    id: uuid(),
    name: "Kids Building Blocks",
    category: "Toys",
    vendor: "Vendor B",
    price: 49,
    stock: 22,
    thumbnail: "https://i.pravatar.cc/48",
    createdAt: new Date(),
  },
  {
    id: uuid(),
    name: "Modern Table Lamp",
    category: "Home",
    vendor: "Vendor C",
    price: 75,
    stock: 15,
    thumbnail: "https://i.pravatar.cc/49",
    createdAt: new Date(),
  },
  {
    id: uuid(),
    name: "Winter Jacket",
    category: "Fashion",
    vendor: "Vendor A",
    price: 210,
    stock: 9,
    thumbnail: "https://i.pravatar.cc/50",
    createdAt: new Date(),
  },
  {
    id: uuid(),
    name: "Noise Cancelling Earbuds",
    category: "Electronics",
    vendor: "Vendor B",
    price: 149,
    stock: 0,
    thumbnail: "https://i.pravatar.cc/51",
    createdAt: new Date(),
  },
  {
    id: uuid(),
    name: "Cookware Set",
    category: "Home",
    vendor: "Vendor A",
    price: 260,
    stock: 11,
    thumbnail: "https://i.pravatar.cc/52",
    createdAt: new Date(),
  },
]);

/* ---------------- FILTER STATE ---------------- */
const filters = reactive({
  search: "",
  selectedCategory: "all",
  selectedVendor: "all",
  stockStatus: "all",
});

/* ---------------- PAGINATION ---------------- */
const currentPage = ref(1);
const pageSize = 5;

const filteredProducts = computed(() =>
  allProducts.value.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    const matchesCategory =
      filters.selectedCategory === "all" ||
      p.category === filters.selectedCategory;

    const matchesVendor =
      filters.selectedVendor === "all" ||
      p.vendor === filters.selectedVendor;

    const matchesStock =
      filters.stockStatus === "all" ||
      (filters.stockStatus === "in-stock" && p.stock > 0) ||
      (filters.stockStatus === "out-of-stock" && p.stock <= 0);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesVendor &&
      matchesStock
    );
  })
);

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / pageSize)
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredProducts.value.slice(start, start + pageSize);
});

/* ---------------- ACTIONS ---------------- */
function editProduct(id: string) {
  router.push(`/products/edit/${id}`);
}

function deleteProduct(id: string) {
  if (confirm("Delete this product?")) {
    allProducts.value = allProducts.value.filter((p) => p.id !== id);
  }
}

function exportCSV() {
  const csv = [
    ["Name", "Category", "Vendor", "Price", "Stock", "Created At"],
    ...allProducts.value.map((p) => [
      p.name,
      p.category,
      p.vendor,
      p.price,
      p.stock,
      format(p.createdAt, "yyyy-MM-dd"),
    ]),
  ]
    .map((row) => row.join(","))
    .join("\n");

  saveAs(
    new Blob([csv], { type: "text/csv;charset=utf-8" }),
    "products.csv"
  );
}

/* ---------------- PAGINATION NAV ---------------- */
function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

watch(filters, () => (currentPage.value = 1), { deep: true });
</script>


<style scoped>
.filter-control {
  height: 42px;
}
</style>

<template>
  <div class="max-w-7xl mx-auto p-6 space-y-6 text-body-color">

    <!-- HEADER -->
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Products</h1>

      <div class="flex gap-2">
        <button
          @click="exportCSV"
          class="flex items-center gap-2 px-4 py-2 bg-primary text-(--primary) rounded-md hover:bg-(--primary-soft) cursor-pointer"
        >
          <FileText class="w-5 h-5" />
          Export
        </button>

        <button
          @click="$router.push('/products/new')"
          class="flex items-center gap-2 px-4 py-2 bg-(--primary) text-white rounded-md hover:bg-success-dark cursor-pointer"
        >
          <Plus class="w-5 h-5" />
          Add Product
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div
      class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4
            bg-body-bg-alt border border-(--border-color)
            rounded-lg"
    >
      <!-- Search -->
      <input
        v-model="filters.search"
        type="text"
        placeholder="Search products..."
        class="h-10.5 w-full rounded-md px-3
              border border-(--border-color)
              bg-body-bg text-body-color
              focus:outline-none focus:ring-1 focus:ring-primary
              placeholder:text-muted dark:placeholder:text-gray-400"
      />

      <!-- Category -->
      <select
        v-model="filters.selectedCategory"
        class="h-10.5 w-full rounded-md px-3
              border border-(--border-color)
              bg-body-bg text-body-color
              focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="all">All Categories</option>
        <option v-for="c in categories" :key="c" :value="c">
          {{ c }}
        </option>
      </select>

      <!-- Vendor -->
      <select
        v-model="filters.selectedVendor"
        class="h-10.5 w-full rounded-md px-3
              border border-(--border-color)
              bg-body-bg text-body-color
              focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="all">All Vendors</option>
        <option v-for="v in vendors" :key="v" :value="v">
          {{ v }}
        </option>
      </select>

      <!-- Stock -->
      <select
        v-model="filters.stockStatus"
        class="h-10.5 w-full rounded-md px-3
              border border-(--border-color)
              bg-body-bg text-body-color
              focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="all">All Stock</option>
        <option value="in-stock">In Stock</option>
        <option value="out-of-stock">Out of Stock</option>
      </select>
    </div>



    <!-- TABLE -->
    <div class="overflow-x-auto border border-(--border-color) rounded-md">
      <table class="min-w-full text-left">
        <thead class="bg-body-bg-alt border-b border-(--border-color)">
          <tr>
            <th class="px-4 py-2">Thumbnail</th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Category</th>
            <th class="px-4 py-2">Vendor</th>
            <th class="px-4 py-2">Price</th>
            <th class="px-4 py-2">Stock</th>
            <th class="px-4 py-2">Created</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="product in paginatedProducts"
            :key="product.id"
            class="border-b border-(--border-color)
                   hover:bg-body-bg-alt/50"
          >
            <td class="px-4 py-2">
              <img
                :src="product.thumbnail"
                class="w-12 h-12 rounded-md object-cover"
              />
            </td>
            <td class="px-4 py-2">{{ product.name }}</td>
            <td class="px-4 py-2">{{ product.category }}</td>
            <td class="px-4 py-2">{{ product.vendor }}</td>
            <td class="px-4 py-2">${{ product.price }}</td>
            <td
              class="px-4 py-2"
              :class="product.stock > 0 ? 'text-success' : 'text-danger'"
            >
              {{ product.stock > 0 ? "In Stock" : "Out of Stock" }}
            </td>
            <td class="px-4 py-2">
              {{ format(product.createdAt, "yyyy-MM-dd") }}
            </td>
            <td class="px-4 py-2 flex gap-2">
              <button
                
                class="p-1 rounded bg-primary text-(--primary) hover:bg-(--primary-soft) cursor-pointer"
              >
                <Edit class="w-4 h-4" />
              </button>
              <button
                @click="deleteProduct(product.id)"
                class="p-1 rounded bg-danger text-(--danger) cursor-pointer"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PAGINATION -->
    <div class="flex justify-between items-center">
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <div class="flex gap-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded border border-(--border-color)
                 disabled:opacity-50"
        >
          Prev
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 rounded border border-(--border-color)
                 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
