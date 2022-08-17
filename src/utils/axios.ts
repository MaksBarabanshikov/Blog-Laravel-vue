import axios, { AxiosRequestConfig } from "axios";
import router from "@/lib/router";

const instance = axios.create({
  baseURL: "http://example.localhost/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
  withCredentials: true,
});

instance.interceptors.request.use(function (config: AxiosRequestConfig) {
  const adminToken = localStorage.getItem("adminToken");
  const token = localStorage.getItem("x_xsrf_token");
  if (adminToken) {
    config.headers!.Authorization = `Bearer ${adminToken}`;
  }

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(undefined, (err) => {
  const errorMessage = err.request.response;
  if (err.response.status === 401 || err.response.status === 419) {
    const token = localStorage.getItem("token");
    const AdminToken = localStorage.getItem("adminToken");

    if (AdminToken) {
      localStorage.removeItem("adminToken");
      return router.push({ name: "AdminLogin" });
    }

    if (token) {
      localStorage.removeItem("token");
      return router.push({ name: "auth" });
    }
  }

  return Promise.reject(JSON.parse(errorMessage));
});

export default instance;
