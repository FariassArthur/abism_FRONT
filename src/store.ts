import { configureStore } from "@reduxjs/toolkit";

//reducer
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import poemReducer from "./slices/poemSlice"
import extraReducer from "./slices/extraSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    poem: poemReducer,
    extra: extraReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
