<template>
  <div class="mobile-phone-filter md:hidden">
    <div class="mobile-phone-actions">
      <button
        class="bg-primary hover:bg-primary-300 mb-4 inline-block flex w-full cursor-pointer items-center justify-center rounded-full py-2 px-8 text-white transition md:hidden"
        @click="open = !open"
      >
        <span class="material-icons mr-2">filter_list</span>
        <span>Filter en sorteren</span>
      </button>
    </div>

    <portal to="phones-footer">
      <div v-if="open" class="mobile-phone-sidebar md:hidden">
        <div
          class="fixed inset-0 top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 transition-opacity"
          @click="open = false"
        ></div>
        <div class="fixed top-0 left-0 bottom-0">
          <div class="h-full w-72 overflow-auto bg-white p-4 shadow">
            <h3 class="mb-4 text-xl font-bold">Filteren en sorteren</h3>
            <div class="mobile-phone-sidebar__actions mb-4">
              <a class="text-primary cursor-pointer underline" @click="clearAllFilters"
                >Alle filters verwijderen</a
              >
            </div>
            <div class="mobile-phone-sidebar__sort mb-4">
              <h4 class="mb-4 text-lg font-bold">Sorteren</h4>

              <div
                v-for="option in sortOptions"
                :key="option.value"
                class="mb-2 rounded border py-4 px-5"
                :class="{ 'border-primary bg-primary/50': newSort === option.value }"
                @click="newSort = option.value"
              >
                <input
                  id="sortRadio"
                  v-model="newSort"
                  class="form-check-input float-left mt-1 mr-3 h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
                  type="radio"
                  name="sortRadio"
                  :value="option.value"
                />
                <span>{{ option.label }}</span>
              </div>
            </div>
            <div class="mobile-phone-sidebar__filter">
              <h4 class="mb-4 text-lg font-bold">Filteren</h4>
              <div class="mobile-phone-sidebar__filters">
                <Collapse
                  v-for="(filter, key) of filterConfig"
                  :key="key"
                  :label="$i18n.t(`phone.filter.${key}`)"
                  class="mr-2 filter"
                >
                  <MultiSelect
                    :value="newFilters[key]"
                    :options="createFilterMultiSelectOptions(filter)"
                    @update:value="setFilters(key, $event)"
                    >{{ key }}
                  </MultiSelect>
                </Collapse>
              </div>
            </div>
            <button
              class="bg-primary hover:bg-primary-300 absolute bottom-10 left-4 right-4 mb-4 inline-block flex cursor-pointer items-center justify-center rounded-full py-2 px-8 text-white transition"
              @click="open = false"
            >
              <span>Toon {{ totalPhones }} telefoons</span>
            </button>
          </div>
        </div>
      </div>
    </portal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import createPhoneFilterConfig from '~/modules/phones/utils/createPhoneFilterConfig';
import { createFilterMultiSelectOptions } from '~/modules/phones/utils/createFilterMultiSelectOptions';
import { sortOptions } from '~/modules/phones/constants';

export default Vue.extend({
  name: 'PhoneFilter',
  props: {
    products: {
      type: Array,
      required: true
    },
    filters: {
      type: Object,
      required: true
    },
    totalPhones: {
      type: Number,
      required: true
    },
    sort: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      open: false,
      newFilters: this.filters,
      newSort: this.sort,
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
      this.newSort = sort;
    },
    newSort(sort) {
      this.$emit('update:sort', sort);
    },
    newFilters(value) {
      this.$emit('update:value', value);
    }
  },
  methods: {
    clearAllFilters() {
      Vue.set(this, 'newFilters', {});
    },
    createFilterMultiSelectOptions,
    setFilters(key: string, values: string[]) {
      Vue.set(this.newFilters, key, values);

      this.$emit('update:value', this.newFilters);
    }
  }
});
</script>
