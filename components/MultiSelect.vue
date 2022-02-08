<template>
  <div class="relative group">
    <select
      class="w-full bg-white border border-gray-300 pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      <option disabled selected>
        <slot />
      </option>
    </select>

    <div
      class="absolute left-0 top-full z-10 bg-white shadow-lg shadow-gray-800 rounded-md py-2 px-4 text-base sm:text-sm hidden group-hover:inline-block transition ease-in-out">
      <Checkbox
        v-for="option in newOptions"
        :id="option.value"
        :key="option.value"
        :value="option.checked"
        @update:value="option.checked = $event"
        class="whitespace-nowrap mb-2"
      >
        {{ option.label }}
      </Checkbox>
    </div>
  </div>

</template>

<script lang="ts">
import Vue from "vue";

export type MultiSelectOption = {
  label: string
  value: string | number | boolean
  checked: boolean
}

export default Vue.extend({
  name: "MultiSelect",
  props: {
    value: { type: Array, default: () => [] },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      newValue: this.value,
      newOptions: this.options
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        this.newValue = value;
        this.$emit("update:value", value);
      }
    }
  },
  watch: {
    newOptions: {
      handler(option) {
        const selectedValues = option
          .filter((item: MultiSelectOption) => item.checked)
          .map((item: MultiSelectOption) => item.value);

        Vue.set(this, "newValue", selectedValues);
        this.$emit("update:value", selectedValues);
      },
      deep: true
    },
    value: {
      handler(value) {
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
        Vue.set(this, "newValue", value);
      },
      deep: true
    },
    options: {
      handler(option) {
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
       // Vue.set(this, "newOptions", option);
      },
      deep: true
    }
  }
});
</script>
