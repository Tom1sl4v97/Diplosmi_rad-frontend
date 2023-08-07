import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderID: "",
  orderNumber: "",
  orderDate: "",
  orderReciverName: "",
  orderSum: null,
  orderAddress: "",
  orderPhone: "",
  orderEmail: "",
  orderCity: "",
  orderCountry: "",
  orderPostCode: "",
  orderDiscount: "",
  orderDiscountName: "",
  orderShipping: null,
  orderList: [],
};

const userOrderSlice = createSlice({
  name: "userOrder",
  initialState,
  reducers: {
    setUserOrder(state, action) {
      state.orderID = action.payload.orderID;
      state.orderNumber = action.payload.orderNumber;
      state.orderDate = action.payload.orderDate;
      state.orderReciverName = action.payload.orderReciverName;
      state.orderSum = action.payload.orderSum;
      state.orderAddress = action.payload.orderAddress;
      state.orderPhone = action.payload.orderPhone;
      state.orderEmail = action.payload.orderEmail;
      state.orderCity = action.payload.orderCity;
      state.orderCountry = action.payload.orderCountry;
      state.orderPostCode = action.payload.orderPostCode;
      state.orderDiscount = action.payload.orderDiscount;
      state.orderDiscountName = action.payload.orderDiscountName;
      state.orderShipping = action.payload.orderShipping;
      state.orderList = action.payload.orderList;
    },
  },
});

export const userOrderActions = userOrderSlice.actions;

export default userOrderSlice.reducer;
