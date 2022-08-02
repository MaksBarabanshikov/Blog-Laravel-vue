import axios from "axios";
import router from "../router/router";
const instance = axios.create({
    baseURL: process.env.MIX_API_URL,
    timeout: 1000,
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    withCredentials: true,
});

instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('ADMIN_x_xsrf_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


instance.interceptors.response.use({},err => {
    if (err.response.status === 401 || err.response.status === 419) {
        const token = localStorage.getItem('x_xsrf_token')
        const AdminToken = localStorage.getItem('ADMIN_x_xsrf_token')
        if (token) {
            localStorage.removeItem('x_xsrf_token')
            router.push({name: 'auth'})
        }
        else if (AdminToken) {
            localStorage.removeItem('ADMIN_x_xsrf_token')
            router.push({name: 'AdminLogin'})
        }
    }

    return { data: err.response.data, status: err.response.status  }
})

export default instance
