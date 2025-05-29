// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../reducer/ProductSlice';
import cartReducer from '../reducer/CartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
