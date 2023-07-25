import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "en",
};

const langSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLang(state, action) {
      state.lang = action.payload.lang;
    },
  },
});

export const langActions = langSlice.actions;

export default langSlice.reducer;
