import { MultiSelectOption } from '~/components/MultiSelect.vue';

export function createFilterMultiSelectOptions(
  options: Record<string, number>
): MultiSelectOption[] {
  return Object.entries(options).map(([key, count]) => ({
    value: key,
    label: `${key} (${count})`,
    checked: false
  }));
}
