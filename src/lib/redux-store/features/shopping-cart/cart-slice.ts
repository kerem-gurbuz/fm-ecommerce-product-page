import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import type { ProductType } from '@/lib/types/product';
import type { CartType as CartSliceState } from '@/lib/types/shopping-cart';

const initialState: CartSliceState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: (create) => ({
    addToCart: create.preparedReducer(
      (product: ProductType, quantity: number) => {
        const id = nanoid();
        return { payload: { id, product, quantity } };
      },
      (state, action) => {
        const cartItem = action.payload;
        state.totalQuantity += cartItem.quantity;
        state.totalPrice += cartItem.product.price * cartItem.quantity;
        state.cartItems.push(cartItem);
      },
    ),
    removeFromCart: create.reducer(
      (state, action: PayloadAction<{ cartItemId: string }>) => {
        const index = state.cartItems.findIndex(
          (cartItem) => cartItem.id === action.payload.cartItemId,
        );
        if (index !== -1) {
          const cartItem = state.cartItems[index];
          state.totalQuantity -= cartItem.quantity;
          state.totalPrice -= cartItem.product.price * cartItem.quantity;
          state.cartItems.splice(index, 1);
        }
      },
    ),
    incrementItemQuantity: create.reducer(
      (state, action: PayloadAction<{ cartItemId: string }>) => {
        const index = state.cartItems.findIndex(
          (cartItem) => cartItem.id === action.payload.cartItemId,
        );
        if (index !== -1) {
          const cartItem = state.cartItems[index];
          cartItem.quantity += 1;
          state.totalQuantity += 1;
          state.totalPrice += cartItem.product.price;
        }
      },
    ),
    decrementItemQuantity: create.reducer(
      (state, action: PayloadAction<{ cartItemId: string }>) => {
        const index = state.cartItems.findIndex(
          (cartItem) => cartItem.id === action.payload.cartItemId,
        );
        if (index !== -1) {
          const cartItem = state.cartItems[index];
          if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            state.totalQuantity -= 1;
            state.totalPrice -= cartItem.product.price;
          } else {
            state.cartItems.splice(index, 1);
          }
        }
      },
    ),
    clearCart: create.reducer(() => {
      return initialState;
    }),
  }),
  selectors: {
    selectCartItems: (state) => state.cartItems,
    selectTotalQuantity: (state) => state.totalQuantity,
    selectTotalPrice: (state) => state.totalPrice,
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
