import {createStore} from "vuex";
import modulePost from "./modules/user";
import moduleAdminPost from "./modules/admin";

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        post: modulePost,
        adminPost: moduleAdminPost,
    }
})

export default store


