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
    initializeProducts: (
      state,
      action: PayloadAction<{ products: ProductType[] }>,
    ) => {
      const { products } = action.payload;
      state.products = products;
    },
    addProduct: (state, action: PayloadAction<{ newProduct: ProductType }>) => {
      const { newProduct } = action.payload;
      state.products.push(newProduct);
    },
    updateProduct: (
      state,
      action: PayloadAction<{ updatedProduct: ProductType }>,
    ) => {
      const { updatedProduct } = action.payload;
      const index = state.products.findIndex(
        (product) => product.id === updatedProduct.id,
      );
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
    removeProduct: (state, action: PayloadAction<{ productId: string }>) => {
      const { productId } = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== productId,
      );
    },
  },
  selectors: {
    selectAllProducts: (state) => state.products,
  },
});

export const { initializeProducts, addProduct, updateProduct, removeProduct } =
  productsSlice.actions;
