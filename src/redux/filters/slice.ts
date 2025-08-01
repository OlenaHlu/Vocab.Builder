import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getCategories } from "./operation";
import { type Category } from "../types";

export type FiltersState = {
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  verbType: string;
  isLoading: boolean;
  error: string | null;
};

const initialState: FiltersState = {
  categories: [],
  selectedCategory: "all",
  searchQuery: "",
  verbType: "",
  isLoading: false,
  error: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<Category>) {
      state.selectedCategory = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setVerbType(state, action: PayloadAction<string>) {
      state.verbType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.isLoading = false;
          state.error = null;
          state.categories = action.payload;
        }
      )
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCategory, setSearchQuery, setVerbType } =
  filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
