import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const tokenString = localStorage.getItem("token");
const idString = localStorage.getItem("id");

const token = tokenString ? JSON.parse(tokenString) : null;
const userId = idString ? JSON.parse(idString) : null;

interface AuthState {
  userId: string | null;
  token: string | null;
  error: any;
  success: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  userId: userId,
  token: token,
  error: false,
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

export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

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
        state.userId = action.payload.id;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.userId = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.userId = null;
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
        state.userId = action.payload.id;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
