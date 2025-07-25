import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { signUp, signIn, signOut, getCurrentUser } from "./operations";
import { type User } from "../types";

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
};

const handlePending = (state: AuthState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: AuthState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.error = action.payload ?? "Something went wrong";
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, handlePending)
      .addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(signUp.rejected, handleRejected)
      .addCase(signIn.pending, handlePending)
      .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(signIn.rejected, handleRejected)
      .addCase(getCurrentUser.pending, handlePending)
      .addCase(
        getCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.user = action.payload;
          state.isLoggedIn = true;
          state.error = null;
        }
      )
      .addCase(getCurrentUser.rejected, handleRejected)
      .addCase(signOut.pending, handlePending)
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(signOut.rejected, handleRejected);
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
