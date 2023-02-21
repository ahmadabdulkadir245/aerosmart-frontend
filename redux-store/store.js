import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../slices/search";
import basketReducer from "../slices/basketSlice";
import navReducer from '../slices/navSlice'
export const store = configureStore({
  reducer: {
    search: searchReducer,
    basket: basketReducer,
    nav: navReducer
  },
});
