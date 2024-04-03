import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./app/features/userReducer";
import businessReducer from "./app/features/businessReducer";
import mapReducer from "./app/features/mapReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    business: businessReducer,
    map: mapReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;