import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelevery: false,
  deliveryAt: "",
};
export const orderSlide = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      console.log("action", action, state);
      const { orderItems } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === orderItems?.product
      );
      if (itemOrder) {
        itemOrder.amount += orderItems.amount;
      } else {
        state.orderItems?.push(orderItems);
      }
    },
    removeOrderProduct: (state, action) => {
      console.log("action", action, state);
      const { id } = action.payload;
      const itemOrder = state?.orderItems?.find((item) => item?.product === id);
      if (itemOrder) {
        itemOrder.amount += orderItems?.amount;
      } else {
        state?.orderItems?.push(orderItems);
      }
    },
    increaseOrderAmount: (state, action) => {
      const { id } = action.payload;
      const itemOrder = state?.orderItems?.find((item) => item.product === id);
      if (itemOrder) {
        itemOrder.amount += 1;
      }
    },
    decreaseOrderAmount: (state, action) => {
      const { id } = action.payload;
      const itemOrder = state?.orderItems?.find((item) => item.product === id);
      if (itemOrder && itemOrder.amount > 0) {
        itemOrder.amount -= 1;
      }
    },
  },
});
export const {
  addOrderProduct,
  removeOrderProduct,
  increaseOrderAmount,
  decreaseOrderAmount,
} = orderSlide.actions;
export default orderSlide.reducer;
