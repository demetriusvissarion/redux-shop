import { configureStore } from "@reduxjs/toolkit";

import myCartSlice from "./myCart";
import cartSlice from "./cart";

const store = configureStore({
  reducer: {
    myCart: myCartSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
