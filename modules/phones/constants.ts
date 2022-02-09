import { SortOptions } from '~/modules/phones/types';

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
    label: 'Action',
    value: 'has_promotion'
  }
];