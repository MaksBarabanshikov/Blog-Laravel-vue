import axios from "../../utils/axios";

const moduleAdminPost = {
    actions: {
        CREATE_POST: async ({}, {data}) => {
            console.log(data)
            await axios.post('admin/admin-posts', data)
                .then(res => console.log(res))
                .catch(e => console.log(e))
        },
        GET_ALL_POST: async ctx => {
            let posts
            ctx.commit('updateAdminLoading', true)
            await axios.get('/admin/admin-posts')
                .then(res => posts = res.data)
                .catch(e => console.log(e))
                .finally(() => {
                    ctx.commit('updateAdminPosts', posts)
                    ctx.commit('updateAdminLoading', false)
                })
        },
        GET_CURRENT_POST: async (ctx, {id}) => {
            ctx.commit('updateAdminLoading', true)
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
                    ctx.commit('updateAdminLoading', false)
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
            ctx.commit('updateAdminLoading', true)
            await axios.get('/admin/admin-users')
                .then(res => users = res.data.users)
                .catch(e => console.log(e))
                .finally(() => {
                    ctx.commit('updateUsers', users)
                    ctx.commit('updateAdminLoading', false)
                })
        },
        DELETE_USER: async ({ctx, dispatch}, {id}) => {
            await axios.delete(`admin/admin-users/${id}`)
                .then(() => dispatch('GET_ALL_USERS'))
                .catch(e => console.log(e))
        }
    },
    mutations: {
        updateAdminPosts: (state, posts) => {
            state.posts = posts
        },

        updateUsers: (state, users) => {
            state.users = users
        },
        updateCurrentPost: (state, post) => {
            state.post = post
        },

        updateAdminLoading: (state, loading) => {
            state.loading = loading
        }
    },
    state: {
        posts: [],
        post: {},
        users: [],
        loading: true
    },
    getters: {
        getPostsAdmin: state => state.posts.posts,
        getPostsComment: state => state.posts.comments,
        allUsers: state => state.users,
        currentPost: state => state.post.post,
        currentPostComments: state => state.post.comments,
        currentPostUsers: state => state.post.user,
        getAdminLoading: state => state.loading
    }
}

export default moduleAdminPost
