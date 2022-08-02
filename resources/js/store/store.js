import { createStore } from "vuex";
import modulePost from "./modules/user";
import moduleAdminPost from "./modules/admin";
import moduleLocalStorage from "./modules/localStorage"

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        post: modulePost,
        adminPost: moduleAdminPost,
        localStorage: moduleLocalStorage
    }
})

export default store


