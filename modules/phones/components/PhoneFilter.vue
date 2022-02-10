<template>
  <div class="product-filters">
    <div class="hidden justify-between rounded border bg-white p-3 md:flex">
      <div class="flex">
        <div v-for="(filter, key) of filterConfig" :key="key" class="mr-2 filter">
          <div class="group relative">
            <select
              class="pointer-events-none w-full border border-gray-300 bg-white py-2 pl-3 pr-10 text-left focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            >
              <option disabled selected hidden>
                {{ $i18n.t(`phone.filter.${key}`) }}
              </option>
            </select>

            <div
              class="absolute left-0 top-full z-10 hidden rounded-md bg-white py-2 px-4 text-base shadow-lg shadow-gray-800 transition ease-in-out group-hover:inline-block group-focus:inline-block sm:text-sm"
            >
              <MultiSelect
                :value="newValue[key]"
                :options="createFilterMultiSelectOptions(filter)"
                @update:value="setFilters(key, $event)"
              ></MultiSelect>
            </div>
          </div>
        </div>
      </div>

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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import createPhoneFilterConfig from '~/modules/phones/utils/createPhoneFilterConfig';
import { createFilterMultiSelectOptions } from '~/modules/phones/utils/createFilterMultiSelectOptions';
import { sortOptions } from '~/modules/phones/constants';
import { SortOptions } from '~/modules/phones/types';

export default Vue.extend({
  name: 'PhoneFilter',
  props: {
    products: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newValue: this.value,
      sort: sortOptions[0].value as SortOptions,
      sortOptions
    };
  },
  computed: {
    filterConfig() {
      return createPhoneFilterConfig((this as any).products);
    }
  },
  watch: {
    sort(sort) {
      this.$emit('update:sort', sort);
    }
  },
  methods: {
    createFilterMultiSelectOptions,
    setFilters(key: string, values: string[]) {
      Vue.set(this.newValue, key, values);

      this.$emit('update:value', this.newValue);
    }
  }
});
</script>
