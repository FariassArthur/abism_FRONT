import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const storedTheme = localStorage.getItem("theme") || "light"; // Definindo "light" como padrão

const initialState = {
  Theme: storedTheme as "light" | "dark", // Garantindo que seja do tipo correto
};

export const toggleTheme = createAsyncThunk<
  "light" | "dark",
  void,
  { state: { extra: { Theme: "light" | "dark" } } }
>("theme/toggleTheme", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const newTheme = state.extra.Theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", newTheme);
  return newTheme;
});

const extraSlice = createSlice({
  name: "extra",
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
