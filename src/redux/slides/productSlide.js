import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  detailPageProduct: {},
};
export const productSlide = createSlice({
  name: "product",
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      console.log("action", action);
      state.search = action.payload;
    },
    routeToProductDetail: (state, action) => {
      state.detailPageProduct = action.payload;
    },
  },
});
export const { searchProduct, routeToProductDetail } = productSlide.actions;
export default productSlide.reducer;
