import Axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { BASE_API_URL, API_KEY } from "@/config";
import { toast } from "react-toastify";

export const axios = Axios.create({
  baseURL: BASE_API_URL,
});

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const apiKey = API_KEY;

  if (apiKey) {
    if (!config.params) {
      config.params = {};
    }

    config.params.apikey = apiKey;
  } else {
    console.error("No API key provided");
    console.log(API_KEY);
  }

  return config;
}

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    const clientError =
      error.response?.status >= 400 && error.response?.status < 500;

    if (clientError) {
      toast(message, {
        type: "error",
      });
    } else {
      toast("Something went wrong, please try again later", {
        type: "error",
      });
    }

    console.error({
      err: message,
    });
  }
);
