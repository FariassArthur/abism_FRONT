
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { RootState } from "../store";

const initialState = {
  user: {},
  error: false,
  sucess: false,
  loading: false,
  message: null,
};

//Get user details
export const profile = createAsyncThunk(
  "user/profile",
  async (user, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    
    const token = state.auth.userState.token;

    const data = await userService.profile(user, token);

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
        state.sucess = true;
        state.error = false;
        state.user = action.payload;
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
