import { ProductCategory } from '@/types';

export interface CategoryItem {
  key: ProductCategory | 'all';
  label: string;
}

export const categories: CategoryItem[] = [
  { key: 'all', label: 'All' },
  { key: 'lipstick', label: 'Lipstick' },
  { key: 'foundation', label: 'Foundation' },
  { key: 'mascara', label: 'Mascara' },
  { key: 'blush', label: 'Blush' },
  { key: 'eyeshadow', label: 'Eyeshadow' },
  { key: 'concealer', label: 'Concealer' },
  { key: 'primer', label: 'Primer' },
  { key: 'bronzer', label: 'Bronzer' },
  { key: 'skincare', label: 'Skincare' },
  { key: 'setting-spray', label: 'Setting Spray' },
];
