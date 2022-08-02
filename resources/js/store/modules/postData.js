import axios from "../../utils/axios";
import router from "../../router/router";

const modulePostData = {
    actions: {
        async loadPostData(ctx) {
            let post
            let comments
            let users
            const id = router.currentRoute._rawValue.params.id
            await axios.get(`/api/blog/posts/${id}`)
                .then(res => {
                    console.log(res)
                    post = res.data.post
                    comments = res.data.comments
                    users = res.data.user
                })
                .catch(e => {
                    console.log(e)
                    ctx.commit('updateNotFound', true)
                })
                .finally(() => {
                    ctx.commit('updateLoading', false)
                })

            ctx.commit('updateData', post)
            ctx.commit('updateComments', comments)
            ctx.commit('updateUsers', users)
        }

    },
    mutations: {
        updateData(state, data) {
            state.post = data
        },
        updateComments(state, comments) {
            state.comments = comments
        },
        updateUsers(state, users) {
            state.users = users
        },
        // updateLoading(state, loading) {
        //     state.loading = loading
        // },
        updateNotFound(state, notFound) {
            state.notFound = notFound
        }
    },
    state: {
        post: {},
        comments: {},
        users: {},
        loading: true,
        notFound: false,
    },
    getters: {
        getPostData(state) {
            return state.post;
        },
        getCommentsData(state) {
            return state.comments;
        },
        getUsersData(state) {
            return state.users;
        },
        // getLoading(state) {
        //     return state.loading
        // },
        getNotFound(state) {
            return state.notFound
        }
    }
}

export default modulePostData
