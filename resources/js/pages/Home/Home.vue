<template>
    <main>
        <BigBlog/>
        <Blogs/>
        <RedirectAllBlogs/>
    </main>
</template>

<script>

import Blogs from "./Blogs.vue"
import BigBlog from "./BigBlog";
import RedirectAllBlogs from "./RedirectAllBlogs";
import Loader from "../../components/Loader";
import axios from "axios";

export default {
    name: "Home",
    components: {
        Loader,
        RedirectAllBlogs,
        BigBlog,
        Blogs,
    },
    data: () => ({
        loading: true,
        posts: []
    }),
    mounted() {
        this.loadPosts()
    },
    methods: {
        loadPosts() {
            axios.get('/api/blog/posts')
                .then(res => {
                    this.posts = res.data
                    this.loading = false
                })
        }
    }
}
</script>

<style scoped>

</style>
