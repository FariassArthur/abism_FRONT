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
  users: User[] | null;
  userById: User | null;
  loading: boolean;
  error: any;
  success: boolean;
  message: string | null;
}

const initialState: UserState = {
  user: null, // Não use 'User' aqui como valor
  users: null,
  userById: null,
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const takeUsers = createAsyncThunk("user/users", async (_, thunkAPI) => {
  try {
    const users = await userService.takeAllUsers();

    return users.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//Get user details
export const profile = createAsyncThunk("user/profile", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;

  const token = state.auth.token;

  if (!token) {
    return thunkAPI.rejectWithValue("Token not found");
  }

  try {
    const data = await userService.profile(token);
    return data.user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const takeUserById = createAsyncThunk(
  "user/takeUserById",
  async (id: string) => {
    const data = await userService.takeUserByIdService(id);
    return data.user;
  }
);

export const update = createAsyncThunk(
  "user/update",
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
      })
      .addCase(takeUsers.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(takeUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.users = action.payload;
      })
      .addCase(takeUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.users = null;
      })
      .addCase(takeUserById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(takeUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.userById = action.payload;
      })
      .addCase(takeUserById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.userById = null;
        state.error = action.payload;
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
