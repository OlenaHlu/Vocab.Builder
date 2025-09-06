import { createAsyncThunk } from "@reduxjs/toolkit";
import authenticatedAxios from "../../api/axiosConfig";
import {
  type Category,
  type WordsResponse,
  type WordsRequestParams,
  type UserWordsResponse,
  type AddNewWordResponse,
  type EditWordRequest,
  type EditWordResponse,
  type DeleteWordResponse,
  type CreateNewWordRequest,
  type CreateNewWordResponse,
  type TasksResponse,
  type AnswersRequest,
  type AnswersResponse,
} from "../types";
import axios from "axios";

export const getAllWords = createAsyncThunk<
  WordsResponse,
  WordsRequestParams | void,
  { rejectValue: string }
>("words/getAllWords", async (params, { rejectWithValue }) => {
  try {
    const response = await authenticatedAxios.get<WordsResponse>("/words/all", {
      params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue("An unexpected error occured.");
  }
});

export const getUserWords = createAsyncThunk<
  UserWordsResponse,
  WordsRequestParams | void,
  { rejectValue: string }
>("words/getUserWords", async (params, { rejectWithValue }) => {
  try {
    const response = await authenticatedAxios.get<UserWordsResponse>(
      "/words/own",
      {
        params,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue("An unexpected error occured.");
  }
});

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

export const addWordById = createAsyncThunk<
  AddNewWordResponse,
  { id: string },
  { rejectValue: string }
>("words/addwordById", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await authenticatedAxios.post<AddNewWordResponse>(
      `words/add/${id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue("An unexpected error occurred.");
  }
});

export const editWord = createAsyncThunk<
  EditWordResponse,
  { id: string; data: EditWordRequest },
  { rejectValue: string }
>("words/editWord", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await authenticatedAxios.patch<EditWordResponse>(
      `words/edit/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue("An unexpected error occured.");
  }
});

export const deleteWord = createAsyncThunk<
  DeleteWordResponse,
  { id: string },
  { rejectValue: string }
>("words/deleteWord", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await authenticatedAxios.delete<DeleteWordResponse>(
      `words/delete/${id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue("An unexpected error occured.");
  }
});

export const createNewWord = createAsyncThunk<
  CreateNewWordResponse,
  CreateNewWordRequest,
  { rejectValue: string }
>("words/createNewWord", async (params, { rejectWithValue }) => {
  try {
    const response = await authenticatedAxios.post<CreateNewWordResponse>(
      "words/create",
      params
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue("An unexpected error occured.");
  }
});

export const getStatistics = createAsyncThunk<
  { totalCount: number },
  void,
  { rejectValue: string }
>("words/getStatistics", async (_, { rejectWithValue }) => {
  try {
    const response = await authenticatedAxios.get<{ totalCount: number }>(
      "words/statistics"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue("An unexpected error occured.");
  }
});

export const getTasks = createAsyncThunk<TasksResponse, void>(
  "words/getTasks",
  async (_, thunkAPI) => {
    try {
      const response = await authenticatedAxios.get<TasksResponse>(
        "words/tasks"
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

export const postAnswer = createAsyncThunk<
  AnswersResponse[],
  AnswersRequest[],
  { rejectValue: string }
>("words/postAnswers", async (params, { rejectWithValue }) => {
  try {
    const response = await authenticatedAxios.post<AnswersResponse[]>(
      "words/answers",
      params
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
    return rejectWithValue("An unexpected error occured.");
  }
});
