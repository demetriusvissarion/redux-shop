import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        }); // push() should not be normally used with Redux because it mutates the state but here Redux Toolkit doen't mutate
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItem(state, action) {
      const itemToRemove = action.payload; // id
      const existingItem = state.items.find((item) => item.id === itemToRemove);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== itemToRemove);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

// Custom action creator function that can perform side effects and dispatch other actions (flow of side effects)
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-shop-3a34c-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        } // 'PUT' overwrites existing data
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!!!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!!!",
          message: "Sent cart data failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice; // add ".reducer" if we only need the reducer
