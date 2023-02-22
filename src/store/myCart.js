import { createSlice } from "@reduxjs/toolkit";

// UI-slice
const myCartSlice = createSlice({
  name: "myCart",
  initialState: { showCart: false },
  reducers: {
    toggle(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const myCartActions = myCartSlice.actions;

export default myCartSlice;
