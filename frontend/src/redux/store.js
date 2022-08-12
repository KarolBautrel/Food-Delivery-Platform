import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import orderReducer from "./order";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
  },
});
