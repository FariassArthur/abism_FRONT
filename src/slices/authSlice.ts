import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define a type for the slice state
export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userId: string | null; // Adicione userId ao estado
}

// Define the initial state using that type
const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  userId: null, // Inicialize userId como null
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.token = null;
      state.isAuthenticated = false;
    },
    createAccountSuccess: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { loginSuccess, logout, createAccountSuccess } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export default authSlice.reducer;
