import { render } from "preact";
import "./index.css";
import { App } from "./app.jsx";
import "antd/dist/reset.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
