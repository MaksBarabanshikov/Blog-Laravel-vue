import {createStore} from "vuex";
import modulePost from "./service/post";
import modulePostData from "./modules/postData";
import moduleAdminPost from "./service/admin";

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        post: modulePost,
        postData: modulePostData,
        adminPost: moduleAdminPost,
    }
})

export default store


