import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import poemService from "../services/poemService";
import { RootState } from "../store";

interface Poem {
  id: string;
  title: string;
  content: string;
  userid: string;
}

interface PoemState {
  poem: Poem[];
  poemUnique: Poem | null;
  userPoems: Poem[] | null;
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: PoemState = {
  poem: [],
  poemUnique: null,
  userPoems: [],
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
  async (id: string) => {
    const data = await poemService.takePoemById(id);
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

export const editPoemSlice = createAsyncThunk(
  "poem/editPoem",
  async (data: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token: any = state.auth.token;

    if (!token) {
      // Handle missing token (throw error, dispatch separate action, etc.)
      console.error("Token not found in Redux state");
      return; // Or throw an error with a specific message
    }

    await poemService.editPoemService(data, token);
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
      })
      .addCase(takeUserPoemsSlice.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(takeUserPoemsSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = false;
        state.userPoems = action.payload;
      })
      .addCase(takeUserPoemsSlice.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.userPoems = null;
        state.error = action.payload;
      });
  },
});

export default poemSlice.reducer;
