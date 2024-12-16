import { json } from "react-router-dom";

export const getDiscountValue = (value, price) => {
  if (!value || !price) {
    return 0;
  }
  return (((value - price) * 100) / value).toFixed(0);
};
export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};
