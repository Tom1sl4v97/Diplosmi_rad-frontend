import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProductSet: false,
  productData: {},
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    setProductDetail(state, action) {
        state.isProductSet = true;
        state.productData = action.payload;
    },
  },
});

export const productDetailActions = productDetailSlice.actions;

export default productDetailSlice.reducer;
