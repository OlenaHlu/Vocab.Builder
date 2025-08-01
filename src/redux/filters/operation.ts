import { createAsyncThunk } from "@reduxjs/toolkit";
import authenticatedAxios from "../../api/axiosConfig";

import { type Category } from "../types";

export const getCategories = createAsyncThunk<Category[], void>(
  "filters/getCategories",
  async (_, thunkAPI) => {
    try {
      const response = await authenticatedAxios.get<Category[]>(
        "words/categories"
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred"
      );
    }
  }
);
