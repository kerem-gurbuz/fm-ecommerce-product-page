import { createSelector } from '@reduxjs/toolkit';
import { cartSlice } from './cart-slice';

export const { selectCartItems, selectTotalQuantity, selectTotalPrice } =
  cartSlice.selectors;

export const selectCartItemById = createSelector(
  [selectCartItems, (_, cartItemId: string) => cartItemId],
  (cartItems, cartItemId) => {
    return cartItems.find((cartItem) => cartItem.id === cartItemId);
  },
  {
    devModeChecks: {
      inputStabilityCheck: 'always',
      identityFunctionCheck: 'always',
    },
  },
);
