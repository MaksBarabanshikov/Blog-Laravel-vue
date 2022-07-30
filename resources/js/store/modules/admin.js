import axios from "../../utils/axios";

const moduleAdminPost = {
    state: {
        posts: [],
        post: {},
        updatePost: {},
        putPost: {},
        users: [],
    },
    actions: {
        CREATE_POST: async ({}, { data }) => {
            await axios.post('admin/admin-posts', data)
                .then(res => console.log(res))
                .catch(e => console.log(e))
        },
        GET_ALL_POST: async ({ commit }) => {

            commit('updateAdminPosts', {data: null, error: null, loading: true})

            try {
                const { data } = await axios.get('/admin/admin-posts')

                commit('updateAdminPosts', {...data, error: null, loading: false})

                return {...data, error: null}
            } catch (error) {
                const {
                    data: { message },
                    status,
                } =  error.response

                commit('updateAdminPosts', { data: null, error: {message, status}, loading: false })

                return {data: null, error: { message, status} }
            }
        },
        GET_CURRENT_POST: async ({ commit }, {id}) => {

            commit('updateCurrentPost', {data: null, error: null, loading: true})

            try {
                const { data } = await axios.get(`/admin/admin-posts/${id}`)

                commit('updateCurrentPost', {...data, error: null, loading: false})

                return {...data, error: null}
            } catch (error) {
                const {
                    data: { message },
                    status,
                } =  error.response

                commit('updateCurrentPost', {data: null, error: {message, status}, loading: false})

                return {data: null, error: { message, status} }
            }
        },
        UPDATE_POST: async  ({ commit },{ id, newPost }) => {

            commit('updatePutPost', {data: null, error: null, loading: true})

            try {
              const { data } =  await axios.put(`/admin/admin-posts/${id.id}`, newPost )

                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
        DELETE_POST: async ({ctx, dispatch}, {id}) => {
            await axios.delete(`/admin/admin-posts/${id}`)
                .then(() => dispatch('GET_ALL_POST'))
                .catch(e => console.log(e))
        },
        GET_ALL_USERS: async ctx => {
            let users
            await axios.get('/admin/admin-users')
                .then(res => users = res.data.users)
                .catch(e => console.log(e))
                .finally(() => {
                    ctx.commit('updateUsers', users)
                })
        },
        DELETE_USER: async ({ctx, dispatch}, {id}) => {
            await axios.delete(`admin/admin-users/${id}`)
                .then(() => dispatch('GET_ALL_USERS'))
                .catch(e => console.log(e))
        }
    },
    mutations: {
        updateAdminPosts: (state, payload) => {
            state.posts = payload
        },
        updateUsers: (state, payload) => {
            state.users = payload
        },
        updatePutPost: (state, payload) => {
            state.putPost = payload
        },
        updateCurrentPost: (state, payload) => {
            state.post = payload
        },
    },
    getters: {
        getPostsAdmin: state => state.posts,
        putPost: state => state.putPost,
        allUsers: state => state.users,
        currentPost: state => state.post
    }
}

export default moduleAdminPost
