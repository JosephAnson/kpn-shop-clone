export type PhoneVariant = {
  id: number;
  name: string;
  slug: string;
  next_ship_date: string | null;
  usp_offer: {};
  attributes: {
    color: string;
    color_code: string;
    color_name: string;
    memory: string;
    handset_cat_promotion_sticker: string | null;
    promotion_label: string | null;
    promotion_slider_source: string | null;
    promotion_bg_color: string | null;
    handset_cat_promotion_sticker_kz: string | null;
    promotion_label_kz: string | null;
    promotion_slider_source_kz: string | null;
    promotion_bg_color_kz: string | null;
  };
  ui_suggested_sort_order: number;
};

export type PhoneAttributes = {
  handset_cat_promotion_sticker: string | null;
  promotion_label: string | null;
  promotion_slider_source: string | null;
  promotion_bg_color: string | null;
  handset_cat_promotion_sticker_kz: string | null;
  promotion_label_kz: string | null;
  promotion_slider_source_kz: string | null;
  promotion_bg_color_kz: string | null;
};

export type Phone = {
  id: number;
  name: string;
  slug: string;
  manufacturer: string;
  model: string;
  operating_system: string;
  sim_card_capacity: string;
  refurbished: boolean;
  has_usp: boolean;
  has_5g: boolean;
  has_esim: boolean;
  colors: string[];
  sort_order: number;
  release_date: string;
  default: string;
  has_promotion: boolean;
  variants: PhoneVariant[];
  attributes: PhoneAttributes;
};

export type SortOptions = 'sort_order' | 'release_date' | 'has_promotion';
export type FilterOptions =
  | 'manufacturer'
  | 'operating_system'
  | 'colors'
  | 'has_5g'
  | 'has_esim'
  | 'refurbished';

export interface FilterListItem {
  key: string;
  value: string;
}
