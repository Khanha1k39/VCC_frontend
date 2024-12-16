import axios from "axios";
import { API_URL } from "../config";
import { axiosJWT } from "./UserServices";

export const getAllProduct = async () => {
  const res = await axios.get(`${API_URL}/product/get-all`);
  return res.data;
};
export const createProduct = async (data) => {
  const res = await axios.post(`${API_URL}/product/create`, data);
  return res.data;
};
export const getDerailsProduct = async (id) => {
  const res = await axios.get(`${API_URL}/product/${id}`);
  return res.data;
};
export const updateProduct = async (id, access_token, data) => {
  const res = await axiosJWT.put(
    `${API_URL}/product/update-roduct/${id}`,
    data,
    {
      headers: {
        token: `Beare ${access_token}`,
      },
    }
  );
  return res.data;
};

// router.put("/updatep-roduct/:id", productController.updateProduct);
