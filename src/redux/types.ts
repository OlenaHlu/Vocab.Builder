export type User = {
  _id?: string;
  email: string;
  name: string;
};

export type CurrentUser = {
  _id: string;
  email: string;
  name: string;
  token: string;
};

export type Category = string;

export type Word = {
  _id: string;
  en: string;
  ua: string;
  category: Category;
  isIrregular: boolean;
};

export type UserWord = {
  _id: string;
  en: string;
  ua: string;
  category: Category;
  isIrregular: boolean;
  owner: string;
  progress: number;
};

export type WordsRequestParams = {
  keyword?: string;
  category?: Category;
  isIrregular?: boolean;
  page?: number;
  limit?: number;
};

export type WordRequest = {
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
};

export type EditWordRequest = WordRequest;

export type CreateNewWordRequest = WordRequest;

export type AnswersRequest = {
  _id: string;
  en: string;
  ua: string;
  task: "en" | "ua";
};

//responses type

export type AuthResponse = {
  email: string;
  name: string;
  token: string;
};

export type WordsResponse = {
  results: Word[];
  totalPages: number;
  page: number;
  perPage: number;
};

export type UserWordsResponse = {
  results: UserWord[];
  totalPages: number;
  page: number;
  perPage: number;
};

export type ActionsWordResponse = {
  _id: string;
  en: string;
  ua: string;
  category: string;
  isIrregular: boolean;
  owner: string;
  progress: number;
};

export type AddNewWordResponse = ActionsWordResponse;

export type EditWordResponse = ActionsWordResponse;

export type DeleteWordResponse = {
  id: string;
  message: string;
};

export type CreateNewWordResponse = ActionsWordResponse;

export type TasksResponse = {
  tasks: WordTasksResponse[];
};

export type WordTasksResponse = {
  _id: string;
  ua: string;
  task: string;
};

export type AnswersResponse = {
  _id: string;
  en: string;
  ua: string;
  task: "en" | "ua";
  isDone: boolean;
};
