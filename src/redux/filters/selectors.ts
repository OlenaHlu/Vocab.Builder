import { type RootState } from "../store";

export const selectCategories = (state: RootState) => state.filters.categories;

export const selectSelectedCategory = (state: RootState) =>
  state.filters.selectedCategory;

export const selectSearchQuery = (state: RootState) =>
  state.filters.searchQuery;

export const selectVerbType = (state: RootState) => state.filters.verbType;

export const selectFiltersIsLoading = (state: RootState) =>
  state.filters.isLoading;

export const selectFiltersError = (state: RootState) => state.filters.error;
