import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const userString = localStorage.getItem("user");
const tokenString = localStorage.getItem("token");

const user = userString && JSON.parse(userString);
const token = tokenString && JSON.parse(tokenString);

const initialState = {
  userState: user ? user : null,
  tokenState: token ? token : null,
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
    console.log(data);

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error[0]);
    }

    return data;
  }
);

export const update = createAsyncThunk(
  "auth/update",
  async (user: any, thunkAPI) => {
    const data = await authService.update(user);

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
        state.userState = action.payload;
        state.tokenState = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" && action.payload;
        state.userState = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.userState = null;
        state.tokenState = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.userState = action.payload;
        state.tokenState = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" && action.payload;
      })
      .addCase(update.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.userState = action.payload;
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" && action.payload;
        state.userState = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
