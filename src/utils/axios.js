import axios from "axios";
import router from "../router/index";
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

instance.interceptors.request.use(function (config) {
  const adminToken = localStorage.getItem("adminToken");
  const token = localStorage.getItem("x_xsrf_token");
  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use({}, (err) => {
  if (err.response.status === 401 || err.response.status === 419) {
    const token = localStorage.getItem("x_xsrf_token");
    const AdminToken = localStorage.getItem("adminToken");

    if (token) {
      localStorage.removeItem("x_xsrf_token");
      return router.push({ name: "auth" });
    }
    if (AdminToken) {
      localStorage.removeItem("adminToken");
      return router.push({ name: "AdminLogin" });
    }
  }

  return { data: err.response.data, status: err.response.status };
});

export default instance;
