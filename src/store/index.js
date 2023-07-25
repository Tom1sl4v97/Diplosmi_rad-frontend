import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Auth";
import langReducer from "./LangUse";

const store = configureStore({
  reducer: {
    auth: authReducer,
    lang: langReducer,
  },
});

export default store;
