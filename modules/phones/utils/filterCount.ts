import { Phone } from '~/modules/phones/types'

type YesNoFilterCount = {
  yes: number
  no: number
}

type FilterCount = {
  manufacturer: Record<string, number>
  operating_system: Record<string, number>
  colors: Record<string, number>
  has_5g: YesNoFilterCount
  has_esim: YesNoFilterCount
  refurbished: YesNoFilterCount
}

export default function phoneFilterCount(phones: Phone[]): FilterCount {
  const filterCount: FilterCount = {
    manufacturer: {},
    operating_system: {},
    colors: {},
    has_5g: {
      yes: 0,
      no: 0,
    },
    has_esim: {
      yes: 0,
      no: 0,
    },
    refurbished: {
      yes: 0,
      no: 0,
    },
  }

  for (const product of phones) {
    filterCount.manufacturer[product.manufacturer] =
      filterCount.manufacturer[product.manufacturer] + 1 || 1
    filterCount.operating_system[product.operating_system] =
      filterCount.operating_system[product.operating_system] + 1 || 1

    product.has_5g
      ? (filterCount.has_5g.yes += 1)
      : (filterCount.has_5g.no += 1)

    product.has_esim
      ? (filterCount.has_esim.yes += 1)
      : (filterCount.has_esim.no += 1)

    product.refurbished
      ? (filterCount.refurbished.yes += 1)
      : (filterCount.refurbished.no += 1)

    for (const color of product.colors) {
      filterCount.colors[color] = filterCount.colors[color] + 1 || 1
    }
  }

  return filterCount
}
