import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    price: 0,
    quantity: 0,
    items: [],
  },
  reducers: {
    getActualOrderData: (state, action) => {
      state.price = action.payload.price;
      state.items = action.payload.items;
      state.quantity = action.payload.quantity;
    },
    reducePriceByCoupon: (state, action) => {
      state.price = action.payload.price;
    },
  },
});

export const { getActualOrderData, reducePriceByCoupon } = orderSlice.actions;

export default orderSlice.reducer;
