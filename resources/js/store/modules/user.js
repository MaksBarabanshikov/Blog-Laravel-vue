import axios from "../../utils/axios";
import router from "../../router/router";

const modulePost = {
    state: {
        posts: {},
        currentPost: {},
        sendComment: {},
        logoutUser: {},
        loginUser: {},
        registerUser: {}
    },
    actions: {
        GET_POSTS_USER: async ({commit}) => {
            commit('updatePosts', {posts: null, error: null, loading: true})

            try {

                const {data, status} = await axios.get('/api/blog/posts')

                if (status >= 400) {
                    throw new Error(data.message || 'что-то пошло не так')
                }

                commit('updatePosts', {posts: data, error: null, loading: false})

                return {posts: data, error: null}

            } catch (error) {

                commit('updatePosts', {posts: null, error, loading: false})

                return {data: null, error}
            }
        },
        GET_POST_USER: async ({commit}, {id}) => {
            commit('updatePost', {data: null, error: null, loading: true})

            try {

                const {data, status} = await axios.get(`/api/blog/posts/${id}`)

                if (status >= 400) {
                    throw new Error(data.message || 'Что-то пошло не так')
                }

                commit('updatePost', {...data, error: null, loading: false})

                return {data, error: null}

            } catch (error) {
                commit('updatePost', {data: null, error, loading: false})

                return {data: null, error}
            }
        },
        SEND_COMMENT: async ({commit, dispatch}, {id, message}) => {

            commit('updateSendComment', {data: null, error: null, loading: true})

            try {
                const {data, status} = await axios.post(`/api/posts/comment/${id.id}`, {text: message})

                if (status >= 400) {
                    throw new Error(data.message || 'Что-то пошло не так')
                }

                commit('updateSendComment', {data, error: null, loading: false})

                return {data, error: null}

            } catch (error) {

                commit('updateSendComment', {data: null, error, loading: false})

                return {data: null, error}
            }
        },
        LOGOUT: async ({commit, dispatch}) => {

            try {
                const {data, status} = await axios.post('/api/logout')

                if (status >= 400) {
                    throw new Error(data.message || 'Что-то пошло не так')
                }

                commit('updateLogout', {data, error: null})

                dispatch('checkToken')

                localStorage.removeItem('x_xsrf_token')

                return {data, error: null}

            } catch (error) {

                commit('updateLogout', {data: null, error})

                dispatch('checkToken')

                return {data: null, error}
            }
        },
        LOGIN_USER: async ({commit, dispatch}, {email, password}) => {
            axios.get('/sanctum/csrf-cookie').then(async () => {

                commit('updateLogin', {data: null, error: null, loading: true})

                try {
                    const {data, status} = await axios.post('/api/login', {email, password})

                    if (status >= 400) {
                        throw new Error(data.message || "Что-то пошло не так")
                    }

                    await localStorage.setItem('x_xsrf_token', data.plainTextToken )

                    commit('updateLogin', {data, error: null, loading: false})

                    dispatch('checkToken')

                    await router.push({name: 'blog'})

                    return {data, error: null}

                } catch (error) {

                    commit('updateLogin', {data: null, error, loading: false})

                    dispatch('checkToken')

                    return {data: null, error}
                }
            })
        },
        REGISTER: async (
            {commit, dispatch},
            {name, email, password, password_confirmation}
        ) => {

            commit('updateRegister', {data: null, error: null, loading: true})

            try {
                const {data, status} = await axios.post('/api/register',
                    {name, email, password, password_confirmation}
                )

                if (status >= 400) {
                    throw new Error(data.message || "Что-то пошло не так")
                }

                localStorage.setItem('x_xsrf_token', data.plainTextToken)

                dispatch('checkToken')

                commit('updateRegister', {data, error: null, loading: false})

                await router.push({name: 'all-blogs'})

                return {data, error: null}

            } catch (error) {

                commit('updateRegister', {data: null, error, loading: false})

                return {data: null, error}
            }
        },
    },
    mutations: {
        updatePosts: (state, payload) => state.posts = payload,
        updatePost: (state, payload) => state.currentPost = payload,
        updateSendComment: (state, payload) => state.sendComment = payload,
        updateLogout: (state, payload) => state.logoutUser = payload,
        updateLogin: (state, payload) => state.loginUser = payload,
        updateRegister: (state, payload) => state.registerUser = payload
    },
    getters: {
        allPosts: state => state.posts,
        currentPostUser: state => state.currentPost,
        sendComment: state => state.sendComment,
        getLogout: state => state.logoutUser,
        getLoginUser: state => state.loginUser,
        getRegisterUser: state => state.registerUser
    }
}

export default modulePost
