<template>
  <div class='product-filters'>
    <div class='hidden justify-between rounded border bg-white p-3 md:flex mb-2'>
      <div class='flex'>
        <div v-for='(filter, key) of filterConfig' :key='key' class='mr-2 filter'>
          <div class='group relative'>
            <select
              class='pointer-events-none w-full border border-gray-300 bg-white py-2 pl-3 pr-10 text-left focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
            >
              <option disabled selected hidden>
                {{ $i18n.t(`phone.filter.${key}`) }}
              </option>
            </select>

            <div
              class='absolute left-0 top-full z-10 hidden rounded-md bg-white py-2 px-4 text-base shadow-lg shadow-gray-800 transition ease-in-out group-hover:inline-block group-focus:inline-block sm:text-sm'
            >
              <MultiSelect
                :value='newFilters[key]'
                :options='createFilterMultiSelectOptions(filter)'
                @update:value='setFilters(key, $event)'
              ></MultiSelect>
            </div>
          </div>
        </div>
      </div>

      <div class='product-sort flex items-center'>
        <label class='mr-2'>Sort</label>
        <select
          v-model='sort'
          class='w-full cursor-default border border-gray-300 bg-white py-2 pl-3 pr-10 text-left focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
        >
          <option v-for='option in sortOptions' :key='option.key' :value='option.value'>
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
    <div class='phone-filters__list flex flex-wrap'>
      <div
        v-for='filterItem in filterList'
        :key='filterItem.key'
        class='phone-filters__list__item border border-gray-600 mr-2 mb-2 p-2 flex content-center cursor-pointer'
        @click='removeFilter(filterItem.key, filterItem.value)'>
        <span>{{$i18n.t(`phone.filter.${filterItem.key}`)}}: {{ filterItem.value }}</span>
        <a class='material-icons'> close </a>
      </div>

      <a v-if='filterList.length > 1' class='text-primary cursor-pointer underline mt-2 ml-3' @click='clearAllFilters'>
        Alle filters verwijderen
      </a>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue, { PropType } from 'vue';
import createPhoneFilterConfig from '~/modules/phones/utils/createPhoneFilterConfig';
import { createFilterMultiSelectOptions } from '~/modules/phones/utils/createFilterMultiSelectOptions';
import { sortOptions } from '~/modules/phones/constants';
import { FilterListItem, SortOptions } from '~/modules/phones/types';

export default Vue.extend({
  name: 'PhoneFilter',
  props: {
    products: {
      type: Array,
      required: true
    },
    filters: {
      type: Object as PropType<Record<string, string[]>>,
      required: true
    }
  },
  data() {
    return {
      newFilters: this.filters,
      sort: sortOptions[0].value as SortOptions,
      sortOptions
    };
  },
  computed: {
    filterConfig() {
      return createPhoneFilterConfig((this as any).products);
    },
    filterList(): FilterListItem[] {
      const filterList: FilterListItem[] = [];

      for (const key in this.newFilters) {
        this.newFilters[key].forEach(filter => {
          filterList.push({
            key,
            value: filter
          });
        });
      }

      return filterList;
    }

  },
  watch: {
    sort(sort) {
      this.$emit('update:sort', sort);
    },
    newFilters(filters) {
      this.$emit('update:newFilters', filters);
    }
  },
  methods: {
    createFilterMultiSelectOptions,
    setFilters(key: string, values: string[]) {
      Vue.set(this.newFilters, key, values);

      this.$emit('update:filters', this.newFilters);
    },
    clearAllFilters() {
      this.$emit('clear-filters');
    },
    removeFilter(key: string, value: string) {
      const index = this.newFilters[key].findIndex(item => item === value);
      this.newFilters[key].splice(index, 1);
    }
  }
});
</script>
