import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Auth";
import langReducer from "./LangUse";
import userOrderReducer from "./UserOrder";

const store = configureStore({
  reducer: {
    auth: authReducer,
    lang: langReducer,
    userOrder: userOrderReducer,
  },
});

export default store;
