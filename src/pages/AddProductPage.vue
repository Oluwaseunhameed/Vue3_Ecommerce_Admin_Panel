<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { v4 as uuid } from "uuid";

// FilePond
import vueFilePond from "vue-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Multiselect
import MultiSelect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

// HeadlessUI
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from "@headlessui/vue";

// Icons
import { Plus, Trash2 } from "lucide-vue-next";

const router = useRouter();
const createObjectURL = (file: File) => URL.createObjectURL(file);

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

const schema = yup.object({
  name: yup.string().required("Product name is required"),
  sku: yup.string().required("SKU is required"),
  price: yup.number().typeError("Price must be a number").positive().required(),
  inventory: yup.number().typeError("Inventory must be a number").min(0).required(),
  description: yup.string().required(),
  categories: yup.array().min(1, "Select at least one category"),
});

const { handleSubmit, errors, resetForm, values } = useForm({
  validationSchema: schema,
  initialValues: {
    name: "",
    sku: "",
    price: 0,
    inventory: 0,
    description: "",
    categories: [] as string[],
    images: [] as File[],
    shippingType: "physical",
    attributes: [] as { id: string; name: string; value: string }[],
    variants: [] as { id: string; name: string; price: number }[],
  },
});

const allCategories = ["Electronics", "Fashion", "Books", "Toys", "Home"];

const isVariantModalOpen = ref(false);
const variantForm = reactive({ name: "", price: 0 });

function addVariant() {
  if (!variantForm.name || variantForm.price <= 0) return;
  values.variants.push({ id: uuid(), ...variantForm });
  variantForm.name = "";
  variantForm.price = 0;
  isVariantModalOpen.value = false;
}

function removeVariant(id: string) {
  values.variants = values.variants.filter((v) => v.id !== id);
}

function removeImage(index: number) {
  values.images.splice(index, 1);
}

const onSubmit = handleSubmit((vals) => {
  console.log("Product Submitted", vals);
  alert("Product saved successfully!");
  router.push("/products");
});

const onDiscard = () => {
  if (confirm("Discard changes?")) resetForm();
};
</script>

<template>
<div class="max-w-6xl mx-auto p-6 space-y-6 text-body-color">

  <h1 class="text-3xl font-bold">Add New Product</h1>

  <div class="card shadow-phoenix bg-(--body-bg-alt) border border-(--border-color) rounded-lg">
    <div class="card-header p-4 border-b border-(--border-color)">
      <h2 class="text-xl font-semibold">Product Information</h2>
    </div>

    <div class="card-body space-y-6 p-6">
      <form @submit.prevent="onSubmit" class="space-y-6">

        <!-- Basic Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-base font-medium text-(--muted)">Product Name</label>
            <input
              v-model="values.name"
              type="text"
              placeholder="Enter product name"
              class="mt-2 w-full rounded-md border border-(--border-color) bg-(--body-bg-alt) text-(--body-color) text-base px-3 py-3 placeholder:text-(--muted) dark:placeholder:text-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
            />
            <p class="text-sm text-(--danger) mt-1">{{ errors.name }}</p>
          </div>

          <div>
            <label class="block text-base font-medium text-(--muted)">SKU</label>
            <input
              v-model="values.sku"
              type="text"
              placeholder="Enter SKU"
              class="mt-2 w-full rounded-md border border-(--border-color) bg-(--body-bg-alt) text-(--body-color) text-base px-3 py-3 placeholder:text-(--muted) dark:placeholder:text-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
            />
            <p class="text-sm text-(--danger) mt-1">{{ errors.sku }}</p>
          </div>
        </div>

        <!-- Pricing & Inventory -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-base font-medium text-muted">Price ($)</label>
            <input
              v-model="values.price"
              type="number"
              min="0"
              placeholder="Enter price"
              class="mt-2 w-full rounded-md border border-(--border-color) bg-(--body-bg-alt) text-(--body-color) text-base px-3 py-3 placeholder:text-(--muted) dark:placeholder:text-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
            />
            <p class="text-sm text-(--danger) mt-1">{{ errors.price }}</p>
          </div>

          <div>
            <label class="block text-base font-medium text-(--muted)">Inventory</label>
            <input
              v-model="values.inventory"
              type="number"
              min="0"
              placeholder="Enter inventory"
              class="mt-2 w-full rounded-md border border-(--border-color) bg-(--body-bg-alt) text-(--body-color) text-base px-3 py-3 placeholder:text-(--muted) dark:placeholder:text-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
            />
            <p class="text-sm text-(--danger) mt-1">{{ errors.inventory }}</p>
          </div>

          <div>
            <label class="block text-base font-medium text-(--muted)">Shipping Type</label>
            <select
              v-model="values.shippingType"
              class="mt-2 w-full rounded-md border border-(--border-color) bg-(--body-bg-alt) text-(--body-color) text-base px-3 py-3 placeholder:text-(--muted) dark:placeholder:text-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
            >
              <option value="physical">Physical</option>
              <option value="digital">Digital</option>
            </select>
          </div>
        </div>

        <!-- Categories -->
        <div>
          <label class="block text-base font-medium text-(--muted) mb-2">Categories</label>
          <MultiSelect
            v-model="values.categories"
            :options="allCategories"
            placeholder="Select categories"
            multiple
            class="mt-2 text-(--body-color)"
            :class="['bg-(--body-bg-alt) border border-(--border-color) rounded-md']"
          />
          <p class="text-sm text-(--danger) mt-1">{{ errors.categories }}</p>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-base font-medium text-(--muted)">Description</label>
          <textarea
            v-model="values.description"
            rows="6"
            placeholder="Product description..."
            class="mt-2 w-full rounded-md border border-(--border-color) bg-(--body-bg-alt) text-(--body-color) text-base px-3 py-3 placeholder:text-(--muted) dark:placeholder:text-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
          ></textarea>
          <p class="text-sm text-(--danger) mt-1">{{ errors.description }}</p>
        </div>

        <!-- Images -->
        <div>
          <label class="block text-base font-medium text-(--muted) mb-2">Images</label>
          <FilePond
            v-model="values.images"
            allow-multiple
            accepted-file-types="image/*"
            class="filepond-theme"
            :class="['border border-(--border-color) rounded-md bg-(--body-bg-alt) cursor-pointer']"
          />
          <div class="flex flex-wrap gap-2 mt-2">
            <div v-for="(img, i) in values.images" :key="i" class="relative">
              <img :src="createObjectURL(img)" class="w-28 h-28 object-cover rounded-md border border-(--border-color)"/>
              <button type="button" @click="removeImage(i)" class="absolute top-1 right-1 p-1 bg-(--danger) text-white rounded-full hover:bg-red-600">
                <Trash2 class="w-4 h-4"/>
              </button>
            </div>
          </div>
        </div>

        <!-- Attributes -->
        <div>
          <label class="block text-base font-medium text-(--muted) mb-2">Attributes</label>
          <div v-for="(attr, i) in values.attributes" :key="attr.id" class="flex gap-2 mb-2">
            <input v-model="attr.name" placeholder="Name" class="flex-1 rounded-md border border-(--border-color) bg-(--body-bg-alt) text-(--body-color) text-base px-3 py-2 placeholder:text-(--muted) dark:placeholder:text-gray-400"/>
            <input v-model="attr.value" placeholder="Value" class="flex-1 rounded-md border border-(--border-color) bg-(--body-bg-alt) text-(--body-color) text-base px-3 py-2 placeholder:text-(--muted) dark:placeholder:text-gray-400"/>
            <button type="button" @click="values.attributes.splice(i,1)" class="px-3 bg-(--danger) text-white rounded hover:bg-red-600">
              <Trash2 class="w-5 h-5"/>
            </button>
          </div>
          <button type="button" @click="values.attributes.push({id: uuid(), name:'', value:''})" class="px-4 py-2 rounded bg-(--primary-soft) text-(--primary) hover:bg-(--primary-soft) flex items-center gap-2 cursor-pointer">
            <Plus class="w-5 h-5"/> Add Attribute
          </button>
        </div>

        <!-- Variants -->
        <div>
          <label class="block text-base font-medium text-(--muted) mb-2">Variants</label>
          <div class="flex flex-wrap gap-2">
            <div v-for="v in values.variants" :key="v.id" class="flex items-center gap-2 px-4 py-2 bg-(--body-bg-alt) rounded-md border border-(--border-color) text-(--body-color) text-base">
              <span>{{ v.name }} - ${{ v.price }}</span>
              <button type="button" @click="removeVariant(v.id)" class="text-(--danger) hover:text-red-600">
                <Trash2 class="w-5 h-5"/>
              </button>
            </div>
            <button type="button" @click="isVariantModalOpen = true" class="px-4 py-2 rounded bg-(--primary-soft) text-(--primary) hover:bg-(--primary-soft) flex items-center gap-2 cursor-pointer">
              <Plus class="w-5 h-5"/> Add Variant
            </button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-4 mt-6">
          <button type="button" @click="onDiscard" class="px-5 py-3 rounded border border-(--danger) text-(--danger) hover:bg-danger/10 text-base cursor-pointer">Discard</button>
          <button type="submit" class="px-5 py-3 rounded bg-(--primary-soft) text-(--primary) hover:bg-(--primary-soft) text-base cursor-pointer">Save Draft</button>
          <button type="submit" class="px-5 py-3 rounded bg-(--primary-soft) text-white hover:bg-(--primary-soft)/90 text-base cursor-pointer">Publish</button>
        </div>

      </form>
    </div>
  </div>

  <!-- Variant Modal remains unchanged, styled similarly -->

</div>
</template>
