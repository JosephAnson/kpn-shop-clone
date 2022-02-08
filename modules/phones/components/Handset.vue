<template>
  <div class="product w-full mb-3 md:p-3 md:w-1/3">
    <div class="relative flex flex-col justify-between p-4 bg-white border rounded-lg overflow-hidden h-full">
      <div class="variant-selector absolute top-3 right-3">
        <div
          v-for="(variant, index) in sortedVariants" :key="variant.id"
          class="h-6 w-6 mb-2 border rounded-full variant-selector__item cursor-pointer"
          :class="{'ring-2 ring-secondary ring-offset-1 ': variantIndex === index}"
          :style="{'background-color': variant.attributes.color_code}"
          @click="setVariantIndex(index)"></div>
      </div>
      <div class="product-top">
        <div class="product-image flex justify-center h-[200px] md:h-[240px] w-full mb-4 ">
          <img
            class="object-contain"
            :src="`https://www.kpn.com/shop/cdn/products/_/product_${currentVariant.id}_main.png`"
            :alt="currentVariant.name">
        </div>
        <div class="product-info">
          <p>{{ manufacturer }}</p>
          <h3 class="text-xl font-bold mb-2">
            {{ name }}, {{ currentVariant.attributes.color }}
          </h3>
        </div>
      </div>
      <div class="product-bottom">
        <p
          v-if="currentVariant.attributes.promotion_label"
          class="product-offer bg-secondary px-3 py-2 rounded text-sm mb-2 text-gray-800">
          {{ currentVariant.attributes.promotion_label }}
        </p>
        <div class="product-actions flex justify-end">
          <a
            class="product-link text-primary flex justify-center items-center"
            :href="`https://www.kpn.com/shop/mobiel/${productLink(currentVariant.slug)}`">
            <span class="block mr-2">Bekijk toestel</span>
            <div class="arrow h-8 w-8 flex justify-center items-center bg-primary text-white rounded-full ">
                  <span class="material-icons">
                    chevron_right
                  </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import uniqBy from "lodash/uniqBy";
import Vue from "vue";
import { PhoneVariant } from "~/modules/phones/types";

export default Vue.extend({
  name: "Handset",
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
      const sortedVariants = (this.variants as PhoneVariant[])
        .sort((a, b) => a.ui_suggested_sort_order - b.ui_suggested_sort_order);

      return uniqBy(sortedVariants, function(e: PhoneVariant) {
        return e.attributes.color;
      });
    }
  },
  methods: {
    setVariantIndex(index: number) {
      this.variantIndex = index;
    },
    productLink(slug: string) {
      return slug.split("_").join("/");
    }
  }
});
</script>
