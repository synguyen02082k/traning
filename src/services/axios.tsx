import Axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/constant";

const METHOD = Object.freeze({
  get: "get",
  post: "post",
  put: "put",
  delete: "delete",
});

const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

axios.interceptors.request.use(function async(config) {
  const token = localStorage.getItem("token");
  console.log(token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    Promise.reject(
      error.response?.data?.message || error.request || error.message
    ).catch((err: string) =>
      toast(err.toUpperCase(), {
        autoClose: 2000,
        type: "error",
      })
    );
    throw error;
  }
);

export { axios, METHOD };
