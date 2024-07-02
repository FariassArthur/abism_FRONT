import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
//service

const theme = localStorage.getItem("theme");

const initialState = {
  Theme: theme,
};

export const toggleTheme = createAsyncThunk<
  "light" | "dark",
  void,
  { state: { theme: { theme: "light" | "dark" } } }
>("theme/toggleTheme", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const newTheme = state.theme.theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
  return newTheme;
});

const extraSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      toggleTheme.fulfilled,
      (state, action: PayloadAction<"light" | "dark">) => {
        state.Theme = action.payload;
      }
    );
  },
});

export default extraSlice.reducer;
