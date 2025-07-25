import { createAsyncThunk } from "@reduxjs/toolkit";
import authenticatedAxios from "../../api/axiosConfig";
import {
  unauthenticatedAxios,
  setAccessToken,
  clearAuthTokens,
} from "../../api/authService";
import { type User, type AuthResponse, type CurrentUser } from "../types";

export const signUp = createAsyncThunk<
  User,
  { name: string; email: string; password: string },
  { rejectValue: string }
>("/users/signUp", async ({ name, email, password }, thunkAPI) => {
  try {
    const response = await unauthenticatedAxios.post<AuthResponse>(
      "/users/signup",
      {
        name,
        email,
        password,
      }
    );
    const { email: userEmail, name: userName, token } = response.data;
    setAccessToken(token);

    return { name: userName, email: userEmail } as User;
  } catch (error: any) {
    console.log("signUp rejected error:", error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Registration failed"
    );
  }
});

export const signIn = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("/users/signIn", async ({ email, password }, thunkAPI) => {
  try {
    const response = await unauthenticatedAxios.post<AuthResponse>(
      "/users/signin",
      { email, password }
    );
    const { email: userEmail, name: userName, token } = response.data;
    setAccessToken(token);

    return { name: userName, email: userEmail } as User;
  } catch (error: any) {
    console.log("signIn rejected error:", error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "Login failed"
    );
  }
});

export const getCurrentUser = createAsyncThunk<
  User,
  undefined,
  { rejectValue: string }
>("users/getCurrentUser", async (_, thunkAPI) => {
  try {
    const response = await authenticatedAxios.get<CurrentUser>(
      "/users/current"
    );
    const { _id, name, email } = response.data;
    return { _id, name, email } as User;
  } catch (error: any) {
    console.error("Failed to get current user:", error);
    clearAuthTokens();
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to get user info"
    );
  }
});

export const signOut = createAsyncThunk<
  void,
  undefined,
  { rejectValue: string }
>("users/signOut", async (_, thunkAPI) => {
  try {
    await authenticatedAxios.post("/users/signout");
    clearAuthTokens();
  } catch (error: any) {
    console.error("Failed to sign out:", error);
    clearAuthTokens();
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to sign out"
    );
  }
});
