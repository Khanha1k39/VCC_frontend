import { render } from "preact";
import "./index.css";
import { App } from "./app.jsx";
import "antd/dist/reset.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,

  document.getElementById("app")
);
