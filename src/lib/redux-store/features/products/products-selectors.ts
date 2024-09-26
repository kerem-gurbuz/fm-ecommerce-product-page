import { createSelector } from '@reduxjs/toolkit';
import { productsSlice } from './products-slice';

export const { selectAllProducts } = productsSlice.selectors;

export const selectProductById = createSelector(
  [selectAllProducts, (_, productId: string) => productId],
  (products, productId) => {
    return products.find((product) => product.id === productId);
  },
  {
    devModeChecks: {
      inputStabilityCheck: 'always',
      identityFunctionCheck: 'always',
    },
  },
);
