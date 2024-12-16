import axios from "axios";
import { API_URL } from "../config";
export const axiosJWT = axios.create();
export const loginUser = async (data) => {
  console.log("from service", data);
  const res = await axios.post(`${API_URL}/user/sign-in`, data, {
    withCredentials: true,
  });
  return res.data;
};
export const signupUser = async (data) => {
  const res = await axios.post(`${API_URL}/user/sign-up`, data);
  return res.data;
};
export const getDetailUser = async (id, access_token) => {
  const res = await axiosJWT.get(`${API_URL}/user/get-detail/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};
export const refreshToken = async () => {
  const res = await axios.get(`${API_URL}/user/refresh-token`, {
    withCredentials: true,
  });
  return res.data;
};
export const logout = async () => {
  const res = await axios.get(`${API_URL}/user/logout`, {
    withCredentials: true,
  });
};
