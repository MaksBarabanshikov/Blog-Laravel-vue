import {createStore} from "vuex";
import modulePost from "./modules/post";
import modulePostData from "./modules/postData";
import moduleAdminPost from "./modules/adminPosts";

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


