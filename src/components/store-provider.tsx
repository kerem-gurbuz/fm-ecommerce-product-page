'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';

import { initializeProducts } from '@/lib/redux-store/features/products';
import { type AppStore, makeStore } from '@/lib/redux-store/store';
import type { ProductType } from '@/lib/types/product';

type StoreProviderProps = {
  children: React.ReactNode;
  products: ProductType[];
};

export function StoreProvider({ children, products }: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeProducts({ products }));
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
