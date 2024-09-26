import type { CartType as CartSliceState } from '@/lib/types/shopping-cart';
import { calculateCurrentPrice } from '@/lib/utils';

export const updateTotals = (state: CartSliceState) => {
  state.totalQuantity = state.cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  state.totalPrice = state.cartItems.reduce((total, item) => {
    const currentPrice = calculateCurrentPrice(
      item.product.price,
      item.product.discountPercentage,
    );
    return total + currentPrice * item.quantity;
  }, 0);
};
