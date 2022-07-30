import axios from "../../utils/axios";

const moduleAdminPost = {
    state: {
        posts: [],
        post: {},
        users: [],
    },
    actions: {
        CREATE_POST: async ({}, { data }) => {
            await axios.post('admin/admin-posts', data)
                .then(res => console.log(res))
                .catch(e => console.log(e))
        },
        async GET_ALL_POST({ commit }) {

            commit('updateAdminPosts', {data: null, loading: true})

            try {
                const { data } = await axios.get('/admin/admin-posts')

                commit('updateAdminPosts', {data, loading: false})
                console.log({data, loading: false})

                return {data, error: null}
            } catch (error) {
                console.log(error)
                const {
                    data: { message },
                    status,
                } =  error.response

                commit('updateAdminPosts', { message, loading: false })

                return {data: null, error: { message, status} }
            }
        },
        GET_CURRENT_POST: async (ctx, {id}) => {
            let post
            await axios.get(`/admin/admin-posts/${id}`)
                .then(res => {
                    console.log(res)
                    post = res.data
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    ctx.commit('updateCurrentPost', post)
                })
        },
        UPDATE_POST: async  ({},{id, data}) => {
            await axios.put(`/admin/admin-posts/${id.id}`,data)
                .then(res => {
                    console.log(res)
                })
                .catch(e => {
                    console.log(e);
                })
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
        updateCurrentPost: (state, payload) => {
            state.post = payload
        },
    },
    getters: {
        getPostsAdmin: state => state.posts,
        allUsers: state => state.users,
        currentPost: state => state.post.post,
        currentPostComments: state => state.post.comments,
        currentPostUsers: state => state.post.user,
    }
}

export default moduleAdminPost
