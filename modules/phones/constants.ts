import { Filters, SortOptions } from '~/modules/phones/types';

export const sortOptions: { label: string; value: SortOptions }[] = [
  {
    label: 'Most Sold',
    value: 'sort_order'
  },
  {
    label: 'New',
    value: 'release_date'
  },
  {
    label: 'Has Promotion',
    value: 'has_promotion'
  }
];

export const filters = {
  manufacturer: [],
  operating_system: [],
  colors: [],
  has_5g: [],
  has_esim: [],
  refurbished: []
} as Filters;
