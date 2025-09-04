import { createAsyncThunk } from "@reduxjs/toolkit";
import authenticatedAxios from "../../api/axiosConfig";
import {
  type WordsResponse,
  type WordsRequestParams,
  type UserWordsResponse,
  type AddNewWordResponse,
  type EditWordRequest,
  type EditWordResponse,
  type DeleteWordResponse,
  type CreateNewWordRequest,
  type CreateNewWordResponse,
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
