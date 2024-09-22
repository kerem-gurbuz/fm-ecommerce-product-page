import { PRODUCTS } from '@/lib/data/products';
import type { CartItemType } from '@/types';

export const CART_ITEMS: CartItemType[] = [
  {
    id: 'cart-item-1',
    product: PRODUCTS[0],
    quantity: 3,
  },
];
