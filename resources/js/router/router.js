import {createRouter, createWebHistory} from "vue-router"
import Home from "../pages/Home/Home.vue"
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import AllBlogs from "../pages/All-Blogs/AllBlogs";
import Post from "../pages/Post/Post";
import Regist from "../pages/Auth/Regist";
import Auth from "../pages/Auth/Auth";
import notFound from "../pages/404/notFound";
import AdminAuth from "../pages/Admin/AdminAuth";
import AdminPanel from "../pages/Admin/panel/AdminPanel";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: "welcome",
            component: WelcomePage
        },
        {
            path: '/home',
            name: "blog",
            component: Home
        },
        {
            path: '/all-blogs',
            name: "all-blogs",
            component: AllBlogs
        },
        {
            path: '/post/:id',
            name: "post",
            component: Post,
        },
        {
            path: '/auth',
            name: "auth",
            component: Auth,
        },
        {
            path: '/reg',
            name: "reg",
            component: Regist,
        },
        {
            path: '/admin/login',
            name: 'AdminLogin',
            component: AdminAuth
        },
        {
            path: '/admin/panel',
            name: 'AdminPanel',
            component: AdminPanel
        },
        {
            path: '/:catchAll(.*)',
            name: '404',
            component: notFound
        }
    ]
})

router.beforeEach((to, from, next) => {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
        if (to.name === 'post' || to.name === 'all-blogs'){
           return next({name: 'auth'})
        }
    }

    if (to.name === "auth" && accessToken) {
        return next({name: 'blog'})
    }
    next()
})

export default router
