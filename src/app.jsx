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
export function App() {
  // useEffect(() => {
  //   fetchApi();
  // }, []);
  // const fetchApi = async () => {
  //   const res = await axios.get(
  //     // `${API_URL}/product/get-all`
  //     `http://localhost:3001/api/product/get-all`
  //   );
  //   return res.data;
  // };
  // const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });
  // console.log(query);
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route, i) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
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
