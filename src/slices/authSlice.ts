import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const userString = localStorage.getItem("user");
const user = userString && JSON.parse(userString);

const initialState = {
  user: user ? user : null,
  error: false,
  sucess: false,
  loading: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    const data = await authService.register(user);

    if (data.error) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);
