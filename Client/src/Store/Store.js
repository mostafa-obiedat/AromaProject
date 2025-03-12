import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice"; // استيراد الـ Slice

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;