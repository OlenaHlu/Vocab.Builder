import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllWords, getUserWords, addWordById } from "./operations";
import {
  type WordsResponse,
  type UserWordsResponse,
  type Word,
  type UserWord,
  type AddNewWordResponse,
} from "../types";

export type WordsState = {
  words: Word[];
  userWords: UserWord[];
  totalPages: number;
  page: number;
  perPage: number;
  error: null | string;
  isLoading: boolean;
};

const initialState: WordsState = {
  words: [],
  userWords: [],
  totalPages: 1,
  page: 1,
  perPage: 7,
  error: null,
  isLoading: false,
};

const handlePending = (state: WordsState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (
  state: WordsState,
  action: PayloadAction<string | undefined>
) => {
  state.isLoading = false;
  state.error = action.payload ?? "Something went wrong";
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
      .addCase(getAllWords.pending, handlePending)
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
      .addCase(getAllWords.rejected, handleRejected)
      .addCase(getUserWords.pending, handlePending)
      .addCase(
        getUserWords.fulfilled,
        (state, action: PayloadAction<UserWordsResponse>) => {
          state.isLoading = false;
          state.userWords = action.payload.results;
          state.page = action.payload.page;
          state.perPage = action.payload.perPage;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(getUserWords.rejected, handleRejected)
      .addCase(addWordById.pending, handlePending)
      .addCase(
        addWordById.fulfilled,
        (state, action: PayloadAction<AddNewWordResponse>) => {
          state.isLoading = false;
          const newWord = action.payload;
          const exist = state.userWords.some(
            (word) => word._id === newWord._id
          );
          if (!exist) {
            state.userWords.push(newWord);
          }
        }
      )
      .addCase(addWordById.rejected, handleRejected);
  },
});

export const { setPage } = wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;
