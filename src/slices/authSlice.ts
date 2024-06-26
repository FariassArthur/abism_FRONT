import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const tokenString = localStorage.getItem("token");

const token = tokenString && JSON.parse(tokenString);

const initialState = {
  user: null,
  token: token ? token : null,
  error: false as string | boolean,
  success: false,
  loading: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (user: any, thunkAPI) => {
    const data = await authService.register(user);

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error[0]);
    }

    return data;
  }
);

//Logout an user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

//Sign in an user
export const login = createAsyncThunk(
  "auth/login",
  async (user: any, thunkAPI) => {
    const data = await authService.login(user);

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error[0]);
    }

    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" && action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = null;
        state.token = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" && action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
