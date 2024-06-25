import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import poemService from "../services/poemService";
import { RootState } from "../store";

interface Poem {
  id: string;
  title: string;
  content: string;
  user_id: string;
}

interface PoemState {
  poem: Poem[];
  poemUnique: Poem | null;
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: PoemState = {
  poem: [],
  poemUnique: null,
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

export const takeUserPoemsSlice = createAsyncThunk(
  "poem/takeUserPoems",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.auth.token;
    const res = await poemService.takeUserPoems(token);

    if (res.error) {
      return thunkAPI.rejectWithValue(res.error[0]);
    }

    return res.data;
  }
);

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
      })
      .addCase(takeById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(takeById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.poemUnique = action.payload;
      })
      .addCase(takeById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.poemUnique = null;
        state.error = action.payload;
      });
  },
});

export default poemSlice.reducer;
