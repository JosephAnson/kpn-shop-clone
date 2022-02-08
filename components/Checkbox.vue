<template>
  <div class="form-check mb-2 whitespace-nowrap">
    <label
      v-if="$slots.default"
      class="form-check-label inline-block flex cursor-pointer items-center text-gray-800"
    >
      <input
        v-model="computedValue"
        class="form-check-input float-left mr-2 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none"
        type="checkbox"
      />

      <span><slot /></span>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CheckboxComponent',
  props: {
    id: { type: String, default: '' },
    label: { type: String, default: '' },
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
        return (this as any).newValue;
      },
      set(value) {
        (this as any).newValue = value;
        this.$emit('update:value', value);
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
