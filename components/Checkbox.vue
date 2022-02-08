<template>
  <div class="form-check flex items-center">
    <input
      :id="id"
      v-model="computedValue"
      class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
      type="checkbox" />

    <label v-if="$slots.default" class="form-check-label inline-block text-gray-800" :for="id">
      <slot />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Checkbox",
  props: {
    id: { type: String, default: "" },
    label: { type: String, default: "" },
    value: { type: Boolean, default: false }
  },
  data() {
    return {
      newValue: this.value
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
    value(value: boolean) {
      this.newValue = value;
    }
  }
});
</script>

