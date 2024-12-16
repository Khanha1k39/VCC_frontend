import axios from "axios";
import { API_URL } from "../config";

export const getAllProduct = async () => {
  const res = await axios.get(`${API_URL}/product/get-all`);
  return res.data;
};
export const createProduct = async (data) => {
  const res = await axios.post(`${API_URL}/product/create`, data);
  return res.data;
};
