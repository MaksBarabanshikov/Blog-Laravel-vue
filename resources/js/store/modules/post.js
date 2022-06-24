import axios from "../../utils/axios";
const modulePost = {
    actions: {
        async loadPosts(ctx) {
            let posts
            await axios.get('/api/blog/posts')
                .then(res => {
                    posts = res.data
                })
                .catch(e => console.log(e))
                .finally(() => ctx.commit('updateLoading', false))

            ctx.commit('updatePosts', posts)
        }
    },
    mutations: {
        updatePosts(state, posts) {
            state.posts = posts
        },
        updateLoading(state, loading) {
            state.loading = loading
        }
    },
    state: {
        posts: [],
        loading: true
    },
    getters: {
        allPosts(state) {
            return state.posts
        },
        getLoading(state) {
          return state.loading
        }
    }
}

export default modulePost