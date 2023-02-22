import { configureStore } from "@reduxjs/toolkit";

import myCartSlice from "./myCart";
// import cartReducer from "./cart";

const store = configureStore({
  reducer: {
    myCart: myCartSlice.reducer,
    // cart: cartReducer,
  },
});

export default store;
