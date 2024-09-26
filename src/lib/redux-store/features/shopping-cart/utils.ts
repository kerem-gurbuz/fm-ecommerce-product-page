import type { CartType as CartSliceState } from '@/lib/types/shopping-cart';

export const updateTotals = (state: CartSliceState) => {
  state.totalQuantity = state.cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  state.totalPrice = state.cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
};
