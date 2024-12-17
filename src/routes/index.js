import AdminPage from "../pages/AdminPage/AdminPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetail from "../pages/Product/Product";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignInPage from "../pages/SignInPage/SigninPage";
import SignUpPage from "../pages/SignUpPage/SignupPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: false,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/product/page/:page",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/profile",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/product-detail/:id",
    page: ProductDetail,
    isShowHeader: true,
  },
  {
    path: "/system/admin/:id",
    page: AdminPage,
    isShowHeader: true,
    isPrivate: true,
  },
  {
    path: "/system/admin/:id/:page",
    page: AdminPage,
    isShowHeader: true,
    isPrivate: true,
  },

  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
  },
];
