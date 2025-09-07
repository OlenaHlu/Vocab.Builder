import { type RootState } from "../store";

export const selectWords = (state: RootState) => state.words.words;

export const selectUserWords = (state: RootState) =>
  state.words.userWords ?? [];

export const selectTotalPages = (state: RootState) => state.words.totalPages;

export const selectPerPage = (state: RootState) => state.words.perPage;

export const selectPage = (state: RootState) => state.words.page;

export const selectWordsToStudy = (state: RootState) =>
  state.words.wordsToStudy;

export const selectCategories = (state: RootState) => state.words.categories;

export const selectSelectedCategory = (state: RootState) =>
  state.words.selectedCategory;

export const selectSearchQuery = (state: RootState) => state.words.searchQuery;

export const selectVerbType = (state: RootState) => state.words.verbType;

export const selectWordsError = (state: RootState) => state.words.error;

export const selectWordsIsLoading = (state: RootState) => state.words.isLoading;

export const selectTasks = (state: RootState) => state.words.tasks;
