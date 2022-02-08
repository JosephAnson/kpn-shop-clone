<template>
  <div class="product mb-3 w-full md:w-1/3 md:p-3">
    <div
      class="relative flex h-full flex-col justify-between overflow-hidden rounded-lg border bg-white p-4"
    >
      <div class="variant-selector absolute top-3 right-3">
        <div
          v-for="(variant, index) in sortedVariants"
          :key="variant.id"
          class="variant-selector__item mb-2 h-6 w-6 cursor-pointer rounded-full border"
          :class="{
            'ring-secondary ring-2 ring-offset-1 ': variantIndex === index
          }"
          :style="{ 'background-color': variant.attributes.color_code }"
          @click="setVariantIndex(index)"
        ></div>
      </div>
      <div class="product-top">
        <div class="product-image mb-4 flex h-[200px] w-full justify-center md:h-[240px]">
          <img
            class="object-contain"
            :src="`https://www.kpn.com/shop/cdn/products/_/product_${currentVariant.id}_main.png`"
            :alt="currentVariant.name"
          />
        </div>
        <div class="product-info">
          <p>{{ manufacturer }}</p>
          <h3 class="mb-2 text-xl font-bold">{{ name }}, {{ currentVariant.attributes.color }}</h3>
        </div>
      </div>
      <div class="product-bottom">
        <p
          v-if="currentVariant.attributes.promotion_label"
          class="product-offer bg-secondary mb-2 rounded px-3 py-2 text-sm text-gray-800"
        >
          {{ currentVariant.attributes.promotion_label }}
        </p>
        <div class="product-actions flex justify-end">
          <a
            class="product-link text-primary flex items-center justify-center"
            :href="`https://www.kpn.com/shop/mobiel/${productLink(currentVariant.slug)}`"
          >
            <span class="mr-2 block">Bekijk toestel</span>
            <div
              class="arrow bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white"
            >
              <span class="material-icons"> chevron_right </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import uniqBy from 'lodash/uniqBy';
import Vue from 'vue';
import { PhoneVariant } from '~/modules/phones/types';

export default Vue.extend({
  name: 'HandsetPage',
  props: {
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    variants: { type: Array, required: true }
  },
  data() {
    return {
      variantIndex: 0
    };
  },
  computed: {
    currentVariant(): PhoneVariant {
      return this.sortedVariants[this.variantIndex];
    },
    sortedVariants(): PhoneVariant[] {
      const sortedVariants = (this.variants as PhoneVariant[]).sort(
        (a, b) => a.ui_suggested_sort_order - b.ui_suggested_sort_order
      );

      return uniqBy(sortedVariants, function (e: PhoneVariant) {
        return e.attributes.color;
      });
    }
  },
  methods: {
    setVariantIndex(index: number) {
      this.variantIndex = index;
    },
    productLink(slug: string) {
      return slug.split('_').join('/');
    }
  }
});
</script>
