import { useEffect, useState } from "preact/hooks";
import { DatePicker } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import OrderPage from "./pages/OrderPage/OrderPage";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { Fragment } from "preact";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { axiosJWT, getDetailUser, refreshToken } from "./services/UserServices";
import { useDispatch, useSelector } from "react-redux";
import { isJsonString } from "./comma/utils";
import { updateUser } from "./redux/slides/userSlide";
import HeaderAdminPage from "./components/HeaderComponent/HeaderAdminPage";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import { Bounce, ToastContainer, toast } from "react-toastify";

export function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    console.log("user", user);
    let { storageData, decoded } = handleDecoded();
    console.log("storeage", storageData);
    console.log("decoded", decoded);

    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    }
  }, []);
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData) {
      // storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { storageData, decoded };
  };
  axiosJWT.interceptors.request.use(
    async (config) => {
      console.log("axios config");

      let { storageData, decoded } = handleDecoded();
      const currentTime = new Date();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await refreshToken();
        console.log("response refreshtoken", data);
        config.headers["token"] = `Beare ${data?.access_token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleGetDetailUser = async (id, token) => {
    const res = await getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
    console.log("res get detail", res);
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Router>
        <Routes>
          {routes.map((route, i) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            const isCheckAuth = !route.isPrivate || user.isAdmin;
            route.isPrivate === true &&
              console.log(isCheckAuth === false ? route.path : "");
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout
                    Header={route.isPrivate ? HeaderAdminPage : HeaderComponent}
                  >
                    <Page />
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}
