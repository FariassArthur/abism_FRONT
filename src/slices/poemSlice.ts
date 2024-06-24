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
  poems: Poem[];
  poem: Poem | null;
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: PoemState = {
  poems: [],
  poem: null,
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

export const takeById = createAsyncThunk(
  "poems/takeById",
  async (id: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;

    const data = await poemService.takePoemById(id, token);

    return data.data;
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
      state.poems = [];
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
        state.poems = action.payload;
      })
      .addCase(poems.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.poems = [];
        state.error = typeof action.payload === "string" && action.payload;
      })
      .addCase(takeById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(takeById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.poem = action.payload;
      })
      .addCase(takeById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.poem = null;
        state.error = action.payload;
      });
  },
});

export default poemSlice.reducer;
