<template>
  <main>
    <div class="container">
      <div class="product-filters bg-white border p-3 rounded flex justify-between">
        <div class="flex">
          <div v-for="(filter, key) of filterCounts" :key="key" class="filter mr-2">
            <MultiSelect
              :value="filters[key]"
              :options="createFilter(filter)"
              @update:value="setFilter(key, $event)">{{ key }}
            </MultiSelect>
          </div>
        </div>
        <div class="product-sort flex items-center">
          <label class="mr-2">Sort</label>
          <select
            v-model="sort"
            class="w-full bg-white border border-gray-300 pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option v-for="option in sortOptions" :key="option.key" :value="option.value">{{ option.label }}</option>
          </select>
        </div>
      </div>
      <div class="products flex flex-wrap overflow-hidden md:-mx-3">
        <template v-for="product in visibleProducts">
          <Handset
            :key="product.id"
            :name="product.name"
            :manufacturer="product.manufacturer"
            :variants="product.variants"
          />
        </template>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import orderBy from "lodash/orderBy";
import { Context } from "@nuxt/types";
import { NuxtError } from "@nuxt/types/app";
import Handset from "../components/Handset.vue";
import { Phone } from "~/modules/phones/types";
import phoneFilterCount from "~/modules/phones/utils/filterCount";
import MultiSelect, { MultiSelectOption } from "~/components/MultiSelect.vue";

export default Vue.extend({
  name: "TelefonsPage",
  components: {
    MultiSelect,
    Handset
  },
  layout: "shop",
  async asyncData({ $axios, error }: Context) {
    try {
      // Using the nuxtjs/http module here exposed via context.app
      const response = await $axios.$get("http://localhost:3000/api/products");
      const products: Phone[] = response.results.products;

      return { products };
    } catch (e) {
      const err = e as NuxtError;
      error(err); // Show the nuxt error page with the thrown error
    }
  },
  data() {
    return {
      sort: "sort_order",
      sortOptions: [
        {
          label: "Most Sold",
          value: "sort_order"
        },
        {
          label: "New",
          value: "release_date"
        },
        {
          label: "Action",
          value: "has_promotion"
        }
      ],
      filters: {}
    };
  },
  computed: {
    filteredProducts(): Phone[] {
      const query = this.buildFilter(this.filters);
      const keysWithArrays = ["colors"];
      const keysWithYesNo = ["has_5g", "has_esim", "refurbished"];

      return this.products.filter((product: Phone) => {
        for (const key in query) {
          if (product[key] === undefined) {
            return false;
          } else if (keysWithArrays.includes(key)) {
            return product[key].some(item => query[key].includes(item));
          } else if (keysWithYesNo.includes(key)) {
            return product[key] === true && query[key].includes("yes") || product[key] === true && query[key].includes("no");
          } else if (!query[key].includes(product[key])) {
            return false;
          }
        }
        return true;
      });
    },
    visibleProducts(): Phone[] {
      return orderBy(this.filteredProducts, this.sort);
    },
    filterCounts() {
      return phoneFilterCount(this.filteredProducts);
    }
  },
  methods: {
    buildFilter(filter: Record<string, string>) {
      const query: Record<string, string> = {};
      for (const keys in filter) {
        if (filter[keys].constructor === Array && filter[keys].length > 0) {
          query[keys] = filter[keys];
        }
      }
      return query;
    },
    createFilter(options: Record<string, number>): MultiSelectOption[] {
      return Object.entries(options).map(([key, count]) => ({
        value: key,
        label: `${key} (${count})`,
        checked: false
      }));
    },
    setFilter(key: string, values: string[]) {
      Vue.set(this.filters, key, values);
    }
  }
});
</script>
