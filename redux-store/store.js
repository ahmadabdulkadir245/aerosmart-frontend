import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../slices/search";
import cartReducer from "../slices/cartSlice";
import navReducer from '../slices/navSlice'
export const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
    nav: navReducer
  },
});
