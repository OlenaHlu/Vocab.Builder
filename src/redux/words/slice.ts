import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  getAllWords,
  getUserWords,
  getCategories,
  addWordById,
  editWord,
  deleteWord,
  createNewWord,
  getStatistics,
  getTasks,
  postAnswer,
} from "./operations";
import {
  type WordsResponse,
  type UserWordsResponse,
  type Word,
  type UserWord,
  type AddNewWordResponse,
  type EditWordResponse,
  type DeleteWordResponse,
  type CreateNewWordResponse,
  type Category,
  type WordTasksResponse,
  type TasksResponse,
  type AnswersResponse,
} from "../types";

export type WordsState = {
  words: Word[];
  userWords: UserWord[];
  wordsToStudy: number;
  totalPages: number;
  page: number;
  perPage: number;
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  verbType: string;
  tasks: WordTasksResponse[];
  error: null | string;
  isLoading: boolean;
};

const initialState: WordsState = {
  words: [],
  userWords: [],
  wordsToStudy: 0,
  totalPages: 1,
  page: 1,
  perPage: 7,
  categories: [],
  selectedCategory: "all",
  searchQuery: "",
  verbType: "",
  tasks: [],
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
      //get all words
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

      //get user words
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

      //categories
      .addCase(getCategories.pending, handlePending)
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.isLoading = false;
          state.categories = action.payload;
        }
      )
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      //add word by id from all words to user
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
      .addCase(addWordById.rejected, handleRejected)

      //edit word
      .addCase(editWord.pending, handlePending)
      .addCase(
        editWord.fulfilled,
        (state, action: PayloadAction<EditWordResponse>) => {
          state.isLoading = false;
          const updatedWord = action.payload;
          const index = state.userWords.findIndex(
            (word) => word._id === updatedWord._id
          );
          if (index !== -1) {
            state.userWords[index] = updatedWord;
          }
        }
      )
      .addCase(editWord.rejected, handleRejected)

      //delete word
      .addCase(deleteWord.pending, handlePending)
      .addCase(
        deleteWord.fulfilled,
        (state, action: PayloadAction<DeleteWordResponse>) => {
          state.isLoading = false;
          state.userWords = state.userWords.filter(
            (word) => word._id !== action.payload.id
          );
        }
      )
      .addCase(deleteWord.rejected, handleRejected)

      //create word
      .addCase(createNewWord.pending, handlePending)
      .addCase(
        createNewWord.fulfilled,
        (state, action: PayloadAction<CreateNewWordResponse>) => {
          state.isLoading = false;
          state.userWords.push(action.payload);
        }
      )
      .addCase(createNewWord.rejected, handleRejected)

      //statistics
      .addCase(getStatistics.pending, handlePending)
      .addCase(
        getStatistics.fulfilled,
        (state, action: PayloadAction<{ totalCount: number }>) => {
          state.isLoading = false;
          state.wordsToStudy = action.payload.totalCount;
        }
      )
      .addCase(getStatistics.rejected, handleRejected)

      //tasks
      .addCase(getTasks.pending, handlePending)
      .addCase(
        getTasks.fulfilled,
        (state, action: PayloadAction<TasksResponse>) => {
          state.isLoading = false;
          state.tasks = action.payload.tasks;
        }
      )

      //answers
      .addCase(postAnswer.pending, handlePending)
      .addCase(
        postAnswer.fulfilled,
        (state, action: PayloadAction<AnswersResponse[]>) => {
          state.isLoading = false;
          console.log("Answers posted successfully:", action.payload);
        }
      )
      .addCase(postAnswer.rejected, handleRejected);
  },
});

export const { setPage, setCategory, setSearchQuery, setVerbType } =
  wordsSlice.actions;
export const wordsReducer = wordsSlice.reducer;
