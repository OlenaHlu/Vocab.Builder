import axios from "axios";

export const unauthenticatedAxios = axios.create({
  baseURL: "https://vocab-builder-backend.p.goit.global/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAccessToken = (): string | null => {
  return localStorage.getItem("token");
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem("accessToken", token);
};

export const clearAuthTokens = (): void => {
  localStorage.removeItem("token");
  console.log("Authentication token cleared.");
};
