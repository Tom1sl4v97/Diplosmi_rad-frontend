import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./i18n";

import "./index.css";
import App from "./App";
import store from "./store/Index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
