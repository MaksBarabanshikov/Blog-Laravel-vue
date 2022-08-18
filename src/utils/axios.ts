import axios, { AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/lib/stores/auth.store";
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
  const authStore = useAuthStore();

  const adminToken = authStore.adminToken;
  const token = authStore.token;

  if (adminToken) {
    config.headers!.Authorization = `Bearer ${adminToken}`;
  }

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (res) => {
    const { data } = res;
    console.log(data);
    return { ...data };
  },
  (err) => {
    const errorMessage = err.request.response;

    const authStore = useAuthStore();

    if (err.response.status === 401 || err.response.status === 419) {
      const adminToken = authStore.adminToken;
      const token = authStore.token;

      if (adminToken) {
        authStore.logoutAdmin();
        return router.push({ name: "AdminLogin" });
      }

      if (token) {
        authStore.logout();
        return router.push({ name: "auth" });
      }
    }

    return Promise.reject(JSON.parse(errorMessage));
  }
);

export default instance;
