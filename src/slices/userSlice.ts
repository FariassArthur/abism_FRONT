import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { RootState } from "../store";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null; // Aqui, 'User' é apenas um tipo
  loading: boolean;
  error: string | boolean;
  success: boolean;
  message: string | null;
}

const initialState: UserState = {
  user: null, // Não use 'User' aqui como valor
  error: false,
  success: false,
  loading: false,
  message: null,
};

//Get user details
export const profile = createAsyncThunk("user/profile", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;

  const token = state.auth.token;

  if (!token) {
    return thunkAPI.rejectWithValue("Token not found");
  }

  try {
    console.log("slice")
    const data = await userService.profile(token);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const update = createAsyncThunk(
  "auth/update",
  async (user: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    const token = state.auth.token;

    const data = await userService.update(user, token);
    console.log(user);

    if (data.error) {
      return thunkAPI.rejectWithValue(data.error[0]);
    }

    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(update.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" && action.payload;
        state.user = null;
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
