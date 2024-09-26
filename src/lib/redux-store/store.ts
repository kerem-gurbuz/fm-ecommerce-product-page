import { configureStore } from '@reduxjs/toolkit';

import { productsSlice } from './features/products/products-slice';
import { cartSlice } from './features/shopping-cart/cart-slice';

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productsSlice.reducer,
      cart: cartSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export {
  addProduct,
  removeProduct,
  setProducts,
  updateProduct,
} from './features/products/products-slice';

export {
  selectAllProducts,
  selectProductById,
} from './features/products/products-selectors';

export {
  addToCart,
  clearCart,
  decrementItemQuantity,
  incrementItemQuantity,
  removeFromCart,
} from './features/shopping-cart/cart-slice';

export {
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
} from './features/shopping-cart/cart-selectors';
