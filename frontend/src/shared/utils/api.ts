import axios, { AxiosInstance } from "axios";

const apiClient = () => {

  const headerConfig = {
    Accept: "application/json",
  };
  const instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      post: headerConfig,
      get: headerConfig,
      delete: headerConfig,
    },
  });

  return instance;
};

export const client = apiClient();