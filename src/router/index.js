import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/home-view";
import AllBlogs from "@/views/All-Blogs/AllBlogs";
import PostLayout from "@/views/layout/PostLayout";
import AuthUser from "@/views/Auth/auth-user";
import RegisterUser from "@/views/Auth/register-user";
import AdminAuth from "@/views/Admin/AdminAuth";
import AdminStatisticsLayout from "@/views/Admin/panel/Layout/AdminStatisticsLayout";
import AdminPostLayout from "@/views/Admin/panel/Layout/AdminPostLayout";
import AdminPosts from "@/views/Admin/panel/Posts/AdminPosts";
import AddPost from "@/views/Admin/panel/Posts/AddPost";
import EditPost from "@/views/Admin/panel/Posts/EditPost";
import ViewPost from "@/views/Admin/panel/Posts/ViewPost";
import AdminUserLayout from "@/views/Admin/panel/Layout/AdminUserLayout";
import FooterComp from "@/components/footer-comp";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: () =>
      import(
        /* webpackChunkName: "welcome" */ "@/views/WelcomePage/WelcomePage"
      ),
  },
  {
    path: "/footer",
    name: "footer",
    component: FooterComp,
  },
  {
    path: "/home",
    name: "mainLayout",
    component: () =>
      import(/*webpackChunkName: "main"*/ "@/views/layout/MainLayout"),
    children: [
      {
        path: "",
        name: "blog",
        component: Home,
      },
      {
        path: "/all-blogs",
        name: "all-blogs",
        component: AllBlogs,
      },
      {
        path: "/post/:id",
        name: "post",
        component: PostLayout,
      },
      {
        path: "/auth",
        name: "auth",
        component: AuthUser,
      },
      {
        path: "/reg",
        name: "reg",
        component: RegisterUser,
      },
      {
        path: "/admin/login",
        name: "AdminLogin",
        component: AdminAuth,
      },
    ],
  },
  {
    path: "/admin/panel",
    name: "AdminPanel",
    component: () =>
      import(
        /*webpackChunkName: "AdminPanel"*/ "@/views/Admin/panel/Layout/AdminPanel"
      ),
    children: [
      {
        path: "",
        name: "AdminStatistics",
        component: AdminStatisticsLayout,
      },
      {
        path: "posts",
        name: "AdminPosts",
        component: AdminPostLayout,
        children: [
          {
            path: "",
            name: "AdminGetPosts",
            component: AdminPosts,
          },
          {
            path: "add",
            name: "AddPost",
            component: AddPost,
          },
          {
            path: "edit/:id",
            name: "EditPost",
            component: EditPost,
          },
          {
            path: "view/:id",
            name: "ViewPost",
            component: ViewPost,
          },
        ],
      },
      {
        path: "users",
        name: "AdminUsers",
        component: AdminUserLayout,
      },
    ],
  },
  {
    path: "/:catchAll(.*)*  ",
    name: "404",
    component: () =>
      import(/*webpackChunkName: "NotFound"*/ "@/views/404/notFound"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// const listAuthRoutes = ["home", "posts"];
// const listNotAuthRoutes = ["auth"];

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("x_xsrf_token");
  const AdminToken = localStorage.getItem("ADMIN_x_xsrf_token");
  if (!token) {
    if (to.name === "post" || to.name === "all-blogs") {
      return next({ name: "auth" });
    }
  }

  // if (to.name === "auth") {
  //     return next({name: 'blog'})
  // }
  if (!AdminToken) {
    if (to.name === "AdminPanel") {
      return next({ name: "AdminLogin" });
    }
  } else if (to.name === "AdminLogin" && AdminToken) {
    return next({ name: "AdminPanel" });
  }

  next();
});

export default router;
