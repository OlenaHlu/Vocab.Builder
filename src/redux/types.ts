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

export type EditWordRequest = {
  en: string;
  ua: string;
  category: string;
  isIrregular?: boolean;
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

export type AddNewWordResponse = {
  _id: string;
  en: string;
  ua: string;
  category: string;
  isIrregular: boolean;
  owner: string;
  progress: number;
};

export type EditWordResponse = {
  _id: string;
  en: string;
  ua: string;
  category: string;
  isIrregular: boolean;
  owner: string;
  progress: number;
};

export type DeleteWordResponse = {
  _id: string;
  message: string;
};
