import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/home-view.vue";
import FooterComp from "@/components/footer-comp.vue";
import AuthUser from "@/views/Auth/auth-user.vue";

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
    path: "/footer",
    name: "footer",
    component: FooterComp,
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
        path: "/auth",
        name: "auth",
        component: AuthUser,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("x_xsrf_token");
  const AdminToken = localStorage.getItem("adminToken");

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
