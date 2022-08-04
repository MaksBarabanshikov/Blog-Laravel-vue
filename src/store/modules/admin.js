import axios from "@/utils/axios";

const moduleAdminPost = {
  state: {
    posts: [],
    post: {},
    updatePost: {},
    createPost: {},
    putPost: {},
    users: [],
    loginAdmin: {},
  },
  actions: {
    CREATE_POST: async ({ commit }, { newPost }) => {
      commit("updatePost", { data: null, error: null, loading: true });

      try {
        const { data, status } = await axios.post(
          "/admin/admin-posts",
          newPost
        );

        if (status >= 400) {
          throw new Error(data.message || "Что-то пошло не так");
        }

        commit("updatePost", { data, error: null, loading: false });

        return { ...data, error: null };
      } catch (error) {
        commit("updatePost", { data: null, error, loading: false });

        return { data: null, error };
      }
    },
    GET_ALL_POST: async ({ commit }) => {
      commit("updateAdminPosts", { data: null, error: null, loading: true });

      try {
        const { data } = await axios.get("/admin/admin-posts");

        commit("updateAdminPosts", { ...data, error: null, loading: false });

        return { ...data, error: null };
      } catch (error) {
        const {
          data: { message },
          status,
        } = error.response;

        commit("updateAdminPosts", {
          data: null,
          error: { message, status },
          loading: false,
        });

        return { data: null, error: { message, status } };
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
    LOGIN_ADMIN: async ({ commit }, { email, password }) => {
      commit("updateLoginAdmin", { data: null, error: null, loading: true });

      try {
        axios.get("/sanctum/csrf-cookie").then(async () => {
          const { data, status } = await axios.post("/admin/login", {
            email,
            password,
          });

          console.log(data, status);

          if (status >= 400) {
            throw new Error(data.message || "Что-то пошло не так");
          }

          commit("updateLoginAdmin", { data, error: null, loading: false });

          return { data, error: null };
        });
      } catch (error) {
        commit("updateLoginAdmin", { data: null, error, loading: false });

        return { data: null, error };
      }
    },
  },
  mutations: {
    updateAdminPosts: (state, payload) => {
      state.posts = payload;
    },
    updateUsers: (state, payload) => {
      state.users = payload;
    },
    updatePutPost: (state, payload) => {
      state.putPost = payload;
    },
    updatePost: (state, payload) => {
      state.createPost = payload;
    },
    updateCurrentPost: (state, payload) => {
      state.post = payload;
    },
    updateLoginAdmin: (state, payload) => {
      state.loginAdmin = payload;
    },
  },
  getters: {
    getPostsAdmin: (state) => state.posts,
    putPost: (state) => state.putPost,
    createPost: (state) => state.createPost,
    allUsers: (state) => state.users,
    currentPost: (state) => state.post,
    loginAdmin: (state) => state.loginAdmin,
  },
};

export default moduleAdminPost;
