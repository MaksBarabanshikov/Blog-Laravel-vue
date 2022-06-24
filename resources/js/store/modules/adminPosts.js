import axios from "../../utils/axios";

const moduleAdminPost = {
    actions: {
        async loadPostsAdmin(ctx) {
            let posts
            await axios.get('/admin/admin-posts')
                .then(res => {
                    posts = res.data.posts
                })
                .catch(e => console.log(e))
                .finally(() => ctx.commit('updateLoading', false))
            ctx.commit('updateAdminPosts', posts)
        },
        async deleteAdminPost({ctx,dispatch},{id}) {
            console.log(id)
            await axios.delete(`/admin/admin-posts/${id}`)
                .then(() => dispatch('loadPostsAdmin'))
                .catch(e => console.log(e))
        }
    },
    mutations: {
        updateAdminPosts(state, posts) {
            state.posts = posts
        }
    },
    state: {
        posts: [],
        loading: true
    },
    getters: {
        getPostsAdmin(state) {
            return state.posts
        }
    }

}

export default moduleAdminPost
