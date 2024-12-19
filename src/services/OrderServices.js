import axios from "axios";
import { API_URL } from "../config";

export const createOrder = async (data) => {
  const res = await axios.post(`${API_URL}/order/create`, data);
  console.log("data create orrder", res);

  return res.data;
};
export const checkQuantityStock = async (data) => {
  const res = await axios.post(`${API_URL}/order/check`, data);

  return res.data;
};
