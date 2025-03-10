"use client"; 
  import { configureStore } from "@reduxjs/toolkit";
  import { apiSlice } from "./actions/api/apiSlice";
  import authSlice from "./slices/user/authSlice";
  
  // Create the store
  export const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authSlice,
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable devTools only in development mode
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  // No user fetching on page refresh. Only localStorage will be used to retrieve tokens.
  