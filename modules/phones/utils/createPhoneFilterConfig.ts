import { FilterOptions, Phone } from '~/modules/phones/types';

type CreatePhoneFilterConfig = {
  [key in FilterOptions]: Record<string, number>;
};

const booleanKeys: FilterOptions[] = ['has_5g', 'has_esim', 'refurbished'];

export default function createPhoneFilterConfig(phones: Phone[]): CreatePhoneFilterConfig {
  const filterCount: CreatePhoneFilterConfig = {
    manufacturer: {},
    operating_system: {},
    colors: {},
    has_5g: {},
    has_esim: {},
    refurbished: {}
  };

  for (const product of phones) {
    filterCount.manufacturer[product.manufacturer] =
      filterCount.manufacturer[product.manufacturer] + 1 || 1;

    filterCount.operating_system[product.operating_system] =
      filterCount.operating_system[product.operating_system] + 1 || 1;

    for (const booleanKey of booleanKeys) {
      product[booleanKey]
        ? (filterCount[booleanKey].yes = filterCount[booleanKey].yes + 1 || 1)
        : (filterCount[booleanKey].no = filterCount[booleanKey].no + 1 || 1);
    }

    for (const color of product.colors) {
      filterCount.colors[color] = filterCount.colors[color] + 1 || 1;
    }
  }

  return filterCount;
}
