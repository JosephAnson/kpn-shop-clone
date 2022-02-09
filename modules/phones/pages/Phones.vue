<template>
  <div class="container">
    <p class="text-secondary-600 mt-6 mb-6 text-[32px] md:text-[44px]">
      <span>Kies uit </span> <span class="font-bold">{{ totalPhones }} telefones</span>
    </p>
    <MobilePhoneFilter
      :value="filters"
      :filtered-products="products"
      :total-phones="totalPhones"
      :sort="sort"
      @update:value="filters = $event"
      @update:sort="sort = $event"
    />

    <div class="product-filters hidden justify-between rounded border bg-white p-3 md:flex">
      <PhoneFilter
        :value="filters"
        :filtered-products="products"
        @update:value="filters = $event"
      />

      <div class="product-sort flex items-center">
        <label class="mr-2">Sort</label>
        <select
          v-model="sort"
          class="w-full cursor-default border border-gray-300 bg-white py-2 pl-3 pr-10 text-left focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        >
          <option v-for="option in sortOptions" :key="option.key" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="products flex flex-wrap overflow-hidden md:-mx-3">
      <template v-for="product in sortedAndFilteredProducts">
        <Handset
          :key="product.id"
          :name="product.name"
          :manufacturer="product.manufacturer"
          :variants="product.variants"
        />
      </template>
    </div>
    <portal-target name="phones-footer"></portal-target>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Context } from '@nuxt/types';
import { NuxtError } from '@nuxt/types/app';
import orderBy from 'lodash/orderBy';
import Handset from '../components/Handset.vue';
import { Filters, Phone, SortOptions } from '~/modules/phones/types';
import PhoneFilter from '~/modules/phones/components/PhoneFilter.vue';
import MobilePhoneFilter from '~/modules/phones/components/MobilePhoneFilter.vue';
import { sortOptions } from '~/modules/phones/constants';

const filters = {
  manufacturer: [],
  operating_system: [],
  colors: [],
  has_5g: [],
  has_esim: [],
  refurbished: []
} as Filters;

export default Vue.extend({
  name: 'PhonesPage',
  components: {
    PhoneFilter,
    MobilePhoneFilter,
    Handset
  },
  layout: 'shop',
  async asyncData({ $axios, error, $config: { baseURL }, route }: Context) {
    try {
      // Using the nuxtjs/http module here exposed via context.app
      const response = await $axios.$get(`${baseURL}/api/products`);
      const products: Phone[] = response.results.products;

      const startingFilters = filters;

      'manufacturer' in route.query &&
        (startingFilters.manufacturer = (route.query.manufacturer as string).split(','));
      'operating_system' in route.query &&
        (startingFilters.operating_system = (route.query.operating_system as string).split(','));
      'colors' in route.query &&
        (startingFilters.colors = (route.query.colors as string).split(','));
      'has_5g' in route.query &&
        (startingFilters.has_5g = (route.query.has_5g as string).split(','));
      'has_esim' in route.query &&
        (startingFilters.has_esim = (route.query.has_esim as string).split(','));
      'refurbished' in route.query &&
        (startingFilters.refurbished = (route.query.refurbished as string).split(','));

      const sort = 'sort' in route.query ? (route.query.sort as string) : sortOptions[0].value;

      return { products, route: route.query, filters: startingFilters, sort };
    } catch (e) {
      const err = e as NuxtError;
      error(err); // Show the nuxt error page with the thrown error
    }
  },
  data() {
    return {
      products: [] as Phone[],
      sort: sortOptions[0].value as SortOptions,
      sortOptions,
      filters
    };
  },
  computed: {
    totalPhones() {
      return (this as any).filteredProducts.length;
    },
    filteredProducts(): Phone[] {
      const query = this.buildFilter(this.filters);
      const keysWithArrays = ['colors'];
      const keysWithYesNo = ['has_5g', 'has_esim', 'refurbished'];

      return this.products.filter((product: Record<string, any>) => {
        for (const key in query) {
          // Skip if undefined
          if (product[key] === undefined) {
            return false;
          }

          // If property is array we should check each against the filter
          if (keysWithArrays.includes(key)) {
            return product[key].some((item: string) => query[key].includes(item));
          }

          // If filter is yes or no we should check it matches the boolean equivalent
          if (keysWithYesNo.includes(key)) {
            return (
              (product[key] === true && query[key].includes('yes')) ||
              (product[key] === false && query[key].includes('no'))
            );
          }

          // Finally check it matches the single value of the property
          if (!query[key].includes(product[key])) {
            return false;
          }
        }
        return true;
      });
    },
    sortedAndFilteredProducts(): Phone[] {
      switch (this.sort) {
        case 'release_date':
          return [...this.filteredProducts].sort((first, second) => {
            return new Date(first.release_date).getTime() - new Date(second.sort_order).getTime();
          });
        case 'has_promotion':
          return orderBy(this.filteredProducts, [this.sort, 'sort_order'], ['desc', 'asc']);
        case 'sort_order':
          return orderBy(this.filteredProducts, ['sort_order'], ['asc']);
        default:
          return orderBy(this.filteredProducts, ['sort_order'], ['asc']);
      }
    }
  },
  watch: {
    filters: {
      handler() {
        this.setQuery();
      },
      deep: true
    },
    sort() {
      this.setQuery();
    }
  },
  methods: {
    setQuery() {
      const filters = this.buildFilter(this.filters);
      const query: Record<string, string> = {};

      for (const keys in filters) {
        query[keys] = filters[keys].join(',');
      }

      query.sort = this.sort;

      this.$router.push({
        path: this.$route.path,
        query
      });
    },
    buildFilter(filter: Record<string, string[]>) {
      const query: Record<string, string[]> = {};
      for (const keys in filter) {
        if (filter[keys].constructor === Array && filter[keys].length > 0) {
          query[keys] = filter[keys];
        }
      }
      return query;
    }
  }
});
</script>
