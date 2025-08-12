import { createAsyncThunk } from "@reduxjs/toolkit";
import authenticatedAxios from "../../api/axiosConfig";
import {
  type WordsResponse,
  type WordsRequestParams,
  type UserWordsResponse,
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
