import {createRouter, createWebHistory} from "vue-router"
import Home from "../pages/Home/Home.vue"
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import AllBlogs from "../pages/All-Blogs/AllBlogs";
import Post from "../pages/Post/Post";
import Regist from "../pages/Auth/Regist";
import Auth from "../pages/Auth/Auth";
import notFound from "../pages/404/notFound";
import AdminAuth from "../pages/Admin/AdminAuth";
import AdminPanel from "../pages/Admin/panel/Layout/AdminPanel";
import AdminPostLayout from "../pages/Admin/panel/Layout/AdminPostLayout";
import AdminUserLayout from "../pages/Admin/panel/Layout/AdminUserLayout";
import AdminStatisticsLayout from "../pages/Admin/panel/Layout/AdminStatisticsLayout";
import MainLayout from "../pages/layout/MainLayout";
import AddPost from "../pages/Admin/panel/Posts/AddPost";
import AdminPosts from "../pages/Admin/panel/Posts/AdminPosts";
import EditPost from "../pages/Admin/panel/Posts/EditPost";
import ViewPost from "../pages/Admin/panel/Posts/ViewPost";

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
            name: "mainLayout",
            component: MainLayout,
            children: [
                {
                    path: '',
                    name: "blog",
                    component: Home,
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
            ]
        },
        {
            path: '/admin/panel',
            name: 'AdminPanel',
            component: AdminPanel,
            children: [
                {
                    path: '',
                    name: 'AdminStatistics',
                    component: AdminStatisticsLayout,
                },
                {
                    path: 'posts',
                    name: 'AdminPosts',
                    component: AdminPostLayout,
                    children: [
                        {
                            path: '',
                            name: 'AdminGetPosts',
                            component: AdminPosts
                        },
                        {
                            path: 'add',
                            name: 'AddPost',
                            component: AddPost
                        },
                        {
                            path: 'edit/:id',
                            name: 'EditPost',
                            component: EditPost
                        },
                        {
                            path: 'view/:id',
                            name: 'ViewPost',
                            component: ViewPost
                        }
                    ]
                },
                {
                    path: 'users',
                    name: 'AdminUsers',
                    component: AdminUserLayout,
                },
            ]
        },
        {
            path: '/:catchAll(.*)',
            name: '404',
            component: notFound
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('x_xsrf_token')
    const AdminToken = localStorage.getItem('ADMIN_x_xsrf_token')
    if (!token) {
        if (to.name === 'post' || to.name === 'all-blogs') {
            return next({name: 'auth'})
        }
    }

    // if (to.name === "auth") {
    //     return next({name: 'blog'})
    // }
    if (!AdminToken) {
        if (to.name === "AdminPanel") {
            return next({name: 'AdminLogin'})
        }
    } else if (to.name === "AdminLogin" && AdminToken) {
        return next({name: 'AdminPanel'})
    }

    next()
})

export default router
