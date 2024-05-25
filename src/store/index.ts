import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { businessApi } from './business/BusinessApiSlice';

export const store = configureStore({
  reducer: {
    [businessApi.reducerPath]: businessApi.reducer,
  },
  middleware: (gDM) => gDM().concat(businessApi.middleware),
});

setupListeners(store.dispatch);
