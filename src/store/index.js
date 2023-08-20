import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Auth";
import langReducer from "./LangUse";
import userOrderReducer from "./UserOrder";
import productDetailReducer from "./ProductDetail";

const store = configureStore({
  reducer: {
    auth: authReducer,
    lang: langReducer,
    userOrder: userOrderReducer,
    productDetail: productDetailReducer,
  },
});

export default store;
