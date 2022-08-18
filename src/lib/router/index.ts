import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/home-view.vue";
import AllBlogs from "@/views/All-Blogs/AllBlogs.vue";
import AuthUser from "@/views/Auth/auth-user.vue";
import RegisterUser from "@/views/Auth/register-user.vue";
import PostLayout from "@/views/Post/post-view.vue";
import { useAuthStore } from "@/lib/stores/auth.store";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: () =>
      import(
        /* webpackChunkName: "welcome" */ "@/views/WelcomePage/WelcomePage.vue"
      ),
  },
  {
    path: "/home",
    name: "mainLayout",
    component: () =>
      import(/*webpackChunkName: "main"*/ "@/views/layout/MainLayout.vue"),
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  const token = authStore.token;
  const AdminToken = authStore.adminToken;

  const protectedRoutesUser = ["post", "all-blogs"];

  const protectedRoutesAdmin = [
    "AdminPanel",
    "AdminPosts",
    "AdminGetPosts",
    "AddPost",
    "EditPost",
    "ViewPost",
    "AdminUserLayout",
    "AdminStatistics",
    "AdminUsers",
  ];

  if (!token) {
    protectedRoutesUser.map((route) => {
      to.name === route ? next({ name: "auth" }) : null;
    });
  }

  if (to.name === "auth" && token) {
    return next({ name: "blog" });
  }

  if (!AdminToken) {
    protectedRoutesAdmin.map((route) => {
      to.name === route ? next({ name: "AdminLogin" }) : null;
    });
  }

  if (to.name === "AdminLogin" && AdminToken) {
    return next({ name: "AdminPanel" });
  }

  next();
});

export default router;
