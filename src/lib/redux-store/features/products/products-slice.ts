import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { ProductType } from '@/lib/types/product';

type ProductsSliceState = {
  products: ProductType[];
};

const initialState: ProductsSliceState = {
  products: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (
      state,
      { payload: { products } }: PayloadAction<{ products: ProductType[] }>,
    ) => {
      state.products = products;
    },
    addProduct: (
      state,
      { payload: { product } }: PayloadAction<{ product: ProductType }>,
    ) => {
      state.products.push(product);
    },
    updateProduct: (
      state,
      { payload: { product } }: PayloadAction<{ product: ProductType }>,
    ) => {
      const index = state.products.findIndex(
        (existingProduct) => existingProduct.id === product.id,
      );

      if (index !== -1) {
        state.products[index] = product;
      }
    },
    removeProduct: (
      state,
      { payload: { productId } }: PayloadAction<{ productId: string }>,
    ) => {
      const index = state.products.findIndex(
        (existingProduct) => existingProduct.id === productId,
      );

      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
  },
  selectors: {
    selectAllProducts: (state) => state.products,
  },
});

export const { setProducts, addProduct, updateProduct, removeProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
