import axios from "../../utils/axios";

const modulePost = {
    state: {
        posts: {},
        currentPost: {},
        sendComment: {},
        logout: {}
    },
    actions: {
        GET_POSTS_USER: async ({ commit }) => {
            commit('updatePosts', { posts: null, error: null, loading: true })

            try {

                const { data, status } = await axios.get('/api/blog/posts')

                if (status >= 400) {
                    throw new Error(data.message || 'что-то пошло не так')
                }

                commit('updatePosts', {posts: data, error: null, loading: false})

                return { posts: data, error: null }

            } catch (error) {

                commit('updatePosts', { posts: null, error, loading: false })

                return { data: null, error }
            }
        },
        GET_POST_USER: async ({ commit }, { id }) => {
            commit('updatePost', { data: null, error: null, loading: true })

            try {

                const { data, status } = await axios.get(`/api/blog/posts/${id}`)

                if (status >= 400) {
                    throw new Error(data.message || 'Что-то пошло не так')
                }

                commit('updatePost', { ...data, error: null, loading: false })

                return { data, error: null }

            } catch (error) {
                commit('updatePost', { data: null, error, loading: false })

                return { data: null, error }
            }
        },
        SEND_COMMENT: async ({ commit, dispatch }, { id , message }) => {

            commit('updateSendComment', {data: null, error: null, loading: true})

            try {
                const { data, status } = await axios.post(`/api/posts/comment/${ id.id }`, {text: message})

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
        LOGOUT: async ({commit}) => {
            try {
                const { data, status } = await axios.post('/logout')

                if (status >= 400) {
                    throw new Error(data.message || 'Что-то пошло не так')
                }

                commit('updateLogout', { data, error: null })

                localStorage.removeItem('x_xsrf_token')

                return { data, error: null }

            } catch(error) {

                commit('updateLogout', { data: null, error })

                return {data: null, error}
            }
        },
        LOGIN: async ({ commit }) => {

        },
        REGISTER: async ({ commit }) => {

        },


    },
    mutations: {
        updatePosts: (state, payload) => state.posts = payload,
        updatePost: (state, payload) => state.currentPost = payload,
        updateSendComment: (state, payload) => state.sendComment = payload,
        updateLogout: (state, payload) => state.logout = payload
    },
    getters: {
        allPosts: state => state.posts,
        currentPostUser: state => state.currentPost,
        sendComment: state => state.sendComment,
        getLogout: state => state.logout,
    }
}

export default modulePost
