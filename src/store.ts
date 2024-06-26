import { configureStore } from "@reduxjs/toolkit";

//reducer
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import poemReducer from "./slices/poemSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    poem: poemReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
