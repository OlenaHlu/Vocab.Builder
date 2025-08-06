import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllWords } from "./operations";
import { type WordsResponse, type Word } from "../types";

export type WordsState = {
  words: Word[];
  totalPages: number;
  page: number;
  perPage: number;
  error: null | string;
  isLoading: boolean;
};

const initialState: WordsState = {
  words: [],
  totalPages: 1,
  page: 1,
  perPage: 7,
  error: null,
  isLoading: false,
};

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWords.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getAllWords.fulfilled,
        (state, action: PayloadAction<WordsResponse>) => {
          state.isLoading = false;
          state.words = action.payload.results;
          state.page = action.payload.page;
          state.totalPages = action.payload.totalPages;
          state.perPage = action.payload.perPage;
        }
      )
      .addCase(getAllWords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage } = wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;
