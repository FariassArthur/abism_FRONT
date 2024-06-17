import { configureStore } from "@reduxjs/toolkit";

//reducer
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
