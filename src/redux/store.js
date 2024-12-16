import { configureStore } from "@reduxjs/toolkit";
import userSlide from "./slides/userSlide";
import productSlide from "./slides/productSlide";

export const store = configureStore({
  reducer: {
    user: userSlide,
    product: productSlide,
  },
});
