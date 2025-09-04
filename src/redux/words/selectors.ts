import { type RootState } from "../store";

export const selectWords = (state: RootState) => state.words.words;

export const selectUserWords = (state: RootState) =>
  state.words.userWords ?? [];

export const selectTotalPages = (state: RootState) => state.words.totalPages;

export const selectPerPage = (state: RootState) => state.words.perPage;

export const selectPage = (state: RootState) => state.words.page;

export const selectWordsError = (state: RootState) => state.words.error;

export const selectWordsIsLoading = (state: RootState) => state.words.isLoading;

export const selectWordsToStudy = (state: RootState) =>
  state.words.wordsToStudy;
