import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import poemService from "../services/poemService";
import { RootState } from "../store";

interface Poem {
  id: string;
  name: string;
  content: string;
  user_id: string;
}

interface PoemState {
  poem: Poem[];
  loading: boolean;
  error: string | boolean;
  success: boolean;
}

const initialState: PoemState = {
  poem: [],
  error: false,
  success: false,
  loading: false,
};

export const createPoem = createAsyncThunk(
  "poem/createPoem",
  async (data: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    await poemService.createPoem(data, token);
  }
);

export const poems = createAsyncThunk("poem/poems", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const token = state.auth.token;
  const data = await poemService.takePoems(token);

  if (data.error) {
    return thunkAPI.rejectWithValue(data.error[0]);
  }

  return data.data;
});

export const poemSlice = createSlice({
  name: "poem",
  initialState,
  reducers: {
    resetContent: (state) => {
      state.poem = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(poems.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(poems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.poem = action.payload;
      })
      .addCase(poems.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.poem = [];
        state.error = typeof action.payload === "string" && action.payload;
      });
  },
});

export default poemSlice.reducer;
