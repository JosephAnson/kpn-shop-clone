export type Filters<Keys extends string> = {
  [key in Keys]: string[];
};

export type FilterFunctions<Keys extends string, Item> = {
  [key in Keys]: (item: Item, filters: string[]) => boolean;
};

export function cleanFilters(filter: Record<string, string[]>) {
  const query: Record<string, string[]> = {};
  for (const keys in filter) {
    if (filter[keys].constructor === Array && filter[keys].length > 0) {
      query[keys] = filter[keys];
    }
  }
  return query;
}

function keys<T>(object: T) {
  return Object.keys(object) as (keyof T)[];
}

/***
 * If key from items exists in filters, we run the matching filter function
 * against the items and return the filtered version which is true for all filterFunctions
 *
 * @param items Item[]- Array of items
 * @param filterFunctions Record<FilterOptions<string>, () => Boolean> - dictionary of functions that return boolean
 * @param filters Record <FilterOptions<string>, string[]> - dictionary of string[] which contains filter values
 */
export function filter<FilterOptions extends string, Item>(
  items: Item[],
  filterFunctions: FilterFunctions<FilterOptions, Item>,
  filters: Filters<FilterOptions>
) {
  const cleanedFilters = cleanFilters(filters);

  if (Object.values(cleanedFilters).every((item) => item.length <= 0)) return items;

  return items.filter((item) => {
    return keys(filterFunctions)
      .map((key) => {
        return filterFunctions[key](item, cleanedFilters[key]);
      })
      .every((result) => result === true);
  });
}
