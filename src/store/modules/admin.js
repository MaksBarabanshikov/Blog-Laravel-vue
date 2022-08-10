import axios from "@/utils/axios";
import router from "@/router";

const moduleAdminPost = {
  state: {
    posts: [],
    post: {},
    updatePost: {},
    createPost: {},
    putPost: {},
    users: [],
    loginAdmin: {},
    statistics: {},
  },
  actions: {
    //posts
    CREATE_POST: async ({ commit }, { newPost }) => {
      commit("updateCreatePost", { data: null, error: null, loading: true });

      try {
        const { data, status } = await axios.post(
          "/admin/admin-posts",
          newPost
        );

        if (status >= 400) {
          throw new Error(data.message || "Что-то пошло не так");
        }

        commit("updateCreatePost", { data, error: null, loading: false });

        await router.push({ name: "AdminPosts" });

        return { ...data, error: null };
      } catch (error) {
        commit("updateCreatePost", { data: null, error, loading: false });

        return { data: null, error };
      }
    },
    GET_ALL_POST: async ({ commit }, { page }) => {
      commit("updateAdminPosts", { data: null, error: null, loading: true });

      try {
        const { data, status } = await axios.get(
          `/admin/admin-posts?page=` + page
        );

        if (status >= 400) {
          throw new Error(data.message || "Что-то пошло не так");
        }

        commit("updateAdminPosts", { ...data, error: null, loading: false });

        return { ...data, error: null };
      } catch (error) {
        commit("updateAdminPosts", { data: null, error, loading: false });

        return { data: null, error };
      }
    },
    GET_CURRENT_POST: async ({ commit }, { id }) => {
      commit("updateCurrentPost", { data: null, error: null, loading: true });

      try {
        const { data } = await axios.get(`/admin/admin-posts/${id}`);

        commit("updateCurrentPost", { ...data, error: null, loading: false });

        return { ...data, error: null };
      } catch (error) {
        commit("updateCurrentPost", { data: null, error, loading: false });

        return { data: null, error };
      }
    },
    UPDATE_POST: async ({ commit }, { id, newPost }) => {
      commit("updatePutPost", { data: null, error: null, loading: true });

      try {
        const { data, status } = await axios.put(
          `/admin/admin-posts/${id.id}`,
          newPost
        );

        if (status >= 400) {
          throw new Error(data.message || "Что-то пошло не так");
        }

        commit("updatePutPost", { data, error: null, loading: false });

        await router.push({ name: "AdminPosts" });

        return { data, error: null };
      } catch (error) {
        commit("updatePutPost", { data: null, error, loading: false });

        return { data: null, error };
      }
    },
    DELETE_POST: async ({ dispatch }, { id }) => {
      await axios
        .delete(`/admin/admin-posts/${id}`)
        .then(() => dispatch("GET_ALL_POST"))
        .catch((e) => console.log(e));
    },
    //users
    GET_ALL_USERS: async ({ commit }) => {
      commit("updateUsers", { data: null, error: null, loading: true });

      try {
        const { data, status } = await axios.get("/admin/admin-users");

        if (status >= 400) {
          throw new Error(data.message || "Что-то пошло не так");
        }

        commit("updateUsers", { ...data, error: null, loading: false });

        return { data, error: null };
      } catch (error) {
        commit("updatePutPost", { data: null, error, loading: false });

        return { data: null, error };
      }
    },
    DELETE_USER: async ({ dispatch }, { id }) => {
      await axios
        .delete(`/admin/admin-users/${id}`)
        .then(() => dispatch("GET_ALL_USERS"))
        .catch((e) => console.log(e));
    },
    //statistics
    GET_STATISTICS: async ({ commit }) => {
      commit("updateStatistics", { data: null, error: null, loading: true });
      try {
        const { data, status } = await axios.get("/admin/statistics");

        if (status >= 400) {
          throw new Error(data.message || "Что-то пошло не так");
        }

        commit("updateStatistics", { data, error: null, loading: false });

        return { data, error: null };
      } catch (error) {
        commit("updateStatistics", { data: null, error, loading: false });

        return { data: null, error };
      }
    },
    //auth
    LOGIN_ADMIN: async ({ commit }, { email, password }) => {
      axios.get("/sanctum/csrf-cookie").then(async () => {
        commit("updateLoginAdmin", { data: null, error: null, loading: true });

        try {
          const { data, status } = await axios.post("/admin/login", {
            email,
            password,
          });

          if (status >= 400) {
            throw new Error(data.message || "Что-то пошло не так");
          }

          localStorage.setItem("adminToken", data.token.plainTextToken);

          localStorage.removeItem("x_xsrf_token");

          commit("updateLoginAdmin", { data, error: null, loading: false });

          await router.push({ name: "AdminStatistics" });

          return { data, error: null };
        } catch (error) {
          commit("updateLoginAdmin", { data: null, error, loading: false });

          return { data: null, error };
        }
      });
    },
    LOGOUT_ADMIN: async () => {
      axios.post("/admin/logout").then(() => router.push({ name: "blog" }));
      localStorage.removeItem("adminToken");
    },
  },
  mutations: {
    updateAdminPosts: (state, payload) => {
      state.posts = payload;
    },
    updateUsers: (state, payload) => {
      state.users = payload;
    },
    updateCreatePost: (state, payload) => {
      state.createPost = payload;
    },
    updatePutPost: (state, payload) => {
      state.putPost = payload;
    },
    updateCurrentPost: (state, payload) => {
      state.post = payload;
    },
    updateLoginAdmin: (state, payload) => {
      state.loginAdmin = payload;
    },
    updateStatistics: (state, payload) => {
      state.statistics = payload;
    },
  },
  getters: {
    getPostsAdmin: (state) => state.posts,
    putPost: (state) => state.putPost,
    createPost: (state) => state.createPost,
    allUsers: (state) => state.users,
    currentPost: (state) => state.post,
    loginAdmin: (state) => state.loginAdmin,
    getStatistics: (state) => state.statistics,
  },
};

export default moduleAdminPost;
