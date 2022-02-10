<template>
  <div class="container">
    <p class="text-secondary-600 mt-6 mb-6 text-[32px] md:text-[44px]">
      <span>Kies uit </span> <span class="font-bold">{{ totalPhones }} telefones</span>
    </p>

    <MobilePhoneFilter
      :value="filters"
      :products="products"
      :total-phones="totalPhones"
      :sort="sort"
      @update:value="filters = $event"
      @update:sort="sort = $event"
    />

    <PhoneFilter
      :value="filters"
      :products="filteredProducts"
      :sort="sort"
      @update:value="filters = $event"
      @update:sort="sort = $event"
    />

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
import { FilterOptions, Phone, SortOptions } from '~/modules/phones/types';
import PhoneFilter from '~/modules/phones/components/PhoneFilter.vue';
import MobilePhoneFilter from '~/modules/phones/components/MobilePhoneFilter.vue';
import { filters, sortOptions } from '~/modules/phones/constants';
import { cleanFilters, filter, FilterFunctions } from '~/utils/filter';

function getQueryArrayByKey(query: Record<string, string>, key: FilterOptions): string[] {
  return (key in query && query[key].split(',')) || [];
}

const filterFunctions: FilterFunctions<FilterOptions, Phone> = {
  manufacturer: (item, filters) => filters.includes(item.manufacturer),
  operating_system: (item, filters) => filters.includes(item.operating_system),
  colors: (item, filters) => item.colors.some((item: string) => filters.includes(item)),
  has_5g: (item, filters) =>
    (item.has_5g && filters.includes('yes')) || (!item.has_5g && filters.includes('no')),
  has_esim: (item, filters) =>
    (item.has_esim && filters.includes('yes')) || (!item.has_esim && filters.includes('no')),
  refurbished: (item, filters) =>
    (item.refurbished && filters.includes('yes')) || (!item.refurbished && filters.includes('no'))
};

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

      startingFilters.manufacturer = getQueryArrayByKey(
        route.query as Record<string, string>,
        'manufacturer'
      );
      startingFilters.operating_system = getQueryArrayByKey(
        route.query as Record<string, string>,
        'operating_system'
      );
      startingFilters.colors = getQueryArrayByKey(route.query as Record<string, string>, 'colors');
      startingFilters.has_5g = getQueryArrayByKey(route.query as Record<string, string>, 'has_5g');
      startingFilters.has_esim = getQueryArrayByKey(
        route.query as Record<string, string>,
        'has_esim'
      );
      startingFilters.refurbished = getQueryArrayByKey(
        route.query as Record<string, string>,
        'refurbished'
      );

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
      filters
    };
  },
  computed: {
    totalPhones() {
      return (this as any).filteredProducts.length;
    },
    filteredProducts(): Phone[] {
      return filter(this.products, filterFunctions, this.filters);
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
      const filters = cleanFilters(this.filters);
      const query: Record<string, string> = {};

      for (const keys in filters) {
        query[keys] = filters[keys].join(',');
      }

      query.sort = this.sort;

      this.$router.push({
        path: this.$route.path,
        query
      });
    }
  }
});
</script>
