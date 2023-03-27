import Axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/constant";
import { refreshTokenApi } from "./api/user.api";

const METHOD = Object.freeze({
  get: "get",
  post: "post",
  put: "put",
  delete: "delete",
});

let isRefreshing = false;
let refreshSubscribers: any[] = [];

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
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response.data?.code === "jwt malformed") {
      return onRefreshFailed();
    }
    if (
      error.response.status === 401 &&
      error.response.data?.code === "jwt expired" &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          refreshSubscribers.push(function (access_token: string) {
            originalRequest.headers.Authorization = "Bearer " + access_token;
            resolve(axios(originalRequest));
          });
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      return new Promise(function (resolve, reject) {
        refreshTokenApi()
          .then((response) => {
            isRefreshing = false;
            onRefreshed(response.data.access_token);
            localStorage.setItem("token", response.data.accessToken);
            originalRequest.headers.Authorization =
              "Bearer " + response.data.access_token;
            resolve(axios(originalRequest));
          })
          .catch((error) => {
            isRefreshing = false;
            onRefreshFailed();
            reject(error);
          });
      });
    }
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

function onRefreshed(access_token: string) {
  refreshSubscribers.forEach((callback) => {
    callback(access_token);
  });
  refreshSubscribers = [];
}

function onRefreshFailed() {
  localStorage.clear();
  window.location.reload();
}

export { axios, METHOD };
