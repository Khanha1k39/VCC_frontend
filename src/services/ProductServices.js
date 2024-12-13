import axios from "axios";
import { API_URL } from "../config";

export const getAllProduct = async () => {
  const res = await axios.get(`${API_URL}/product/get-all`);
  return res.data;
};
