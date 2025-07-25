export type User = {
  _id?: string;
  email: string;
  name: string;
};

export type AuthResponse = {
  email: string;
  name: string;
  token: string;
};

export type CurrentUser = {
  _id: string;
  email: string;
  name: string;
  token: string;
};
