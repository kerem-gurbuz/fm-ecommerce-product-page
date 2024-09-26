import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import type { ProductType } from '@/lib/types/product';
import type { CartType as CartSliceState } from '@/lib/types/shopping-cart';
import { updateTotals } from './utils';

const initialState: CartSliceState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: ProductType; quantity: number }>,
    ) => {
      const { product, quantity } = action.payload;
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.product.id === product.id,
      );
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        const newCartItem = { id: nanoid(), product, quantity };
        state.cartItems.push(newCartItem);
      }
      updateTotals(state);
    },
    removeFromCart: (state, action: PayloadAction<{ cartItemId: string }>) => {
      const { cartItemId } = action.payload;
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== cartItemId,
      );
      updateTotals(state);
    },
    incrementItemQuantity: (
      state,
      action: PayloadAction<{ cartItemId: string }>,
    ) => {
      const { cartItemId } = action.payload;
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.id === cartItemId,
      );
      if (existingCartItem) {
        existingCartItem.quantity += 1;
        updateTotals(state);
      }
    },
    decrementItemQuantity: (
      state,
      action: PayloadAction<{ cartItemId: string }>,
    ) => {
      const { cartItemId } = action.payload;
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.id === cartItemId,
      );
      if (existingCartItem) {
        if (existingCartItem.quantity > 1) {
          existingCartItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.id !== existingCartItem.id,
          );
        }
        updateTotals(state);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
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
