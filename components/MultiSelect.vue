<template>
  <div>
    <Checkbox
      v-for="option in newOptions"
      :key="option.value"
      :value="checkedOptions[option.value]"
      @update:value="setCheckedOption(option.value, $event)"
    >
      {{ option.label }}
    </Checkbox>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export type MultiSelectOption = {
  label: string;
  value: string | number | boolean;
};

export default Vue.extend({
  name: 'MultiSelect',
  props: {
    id: { type: String, default: '' },
    value: { type: Array, default: () => [] as PropType<string[]> },
    options: {
      type: Array as PropType<MultiSelectOption[]>,
      default: () => []
    }
  },
  data() {
    return {
      checkedOptions: (this as any).createCheckedOptions(this.value) as Record<string, boolean>,
      newOptions: this.options
    };
  },
  watch: {
    value: {
      handler(value) {
        Vue.set(this, 'checkedOptions', this.createCheckedOptions(value));
      },
      deep: true
    },
    options: {
      handler(value) {
        Vue.set(this, 'newOptions', value);
      },
      deep: true
    }
  },
  methods: {
    createCheckedOptions(value: string[]): Record<string, boolean> {
      const newCheckedOptions: Record<string, boolean> = {};

      for (const option of value) {
        newCheckedOptions[option] = true;
      }

      return newCheckedOptions;
    },
    setCheckedOption(key: string, checked: boolean) {
      this.checkedOptions[key] = checked;

      const selectedValues = Object.keys(this.checkedOptions).filter(
        (key: string) => this.checkedOptions[key]
      );

      this.$emit('update:value', selectedValues);
    }
  }
});
</script>
