import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { getAccessToken, clearAuthTokens } from "./authService";

const authenticatedAxios = axios.create({
  baseURL: "https://vocab-builder-backend.p.goit.global/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

authenticatedAxios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found in localStorage.");
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("Request Error:", error);
    toast.error("Network error or request configuration issue.");
    return Promise.reject(error);
  }
);

authenticatedAxios.interceptors.response.use(
  (response) => {
    console.log("Response Interceptor (Success):", response);
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error(
        "401 Unauthorized. Session expired or token invalid. Clearing token."
      );
      clearAuthTokens();
      toast.error("Your session has expired. Please log in again.");
      window.location.href = "/login";
    }

    let errorMessage = "An unexpected error occurred.";
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.data &&
      (error.response.data as any).message
    ) {
      errorMessage = (error.response.data as any).message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    if (error.response?.status !== 401) {
      toast.error(`Error: ${errorMessage}`);
    }

    return Promise.reject(error);
  }
);

export default authenticatedAxios;
