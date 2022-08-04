import { createStore } from "vuex";
import user from "@/store/modules/user";
import admin from "@/store/modules/admin";
import localStorage from "@/store/modules/localStorage";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    user,
    admin,
    localStorage,
  },
});
