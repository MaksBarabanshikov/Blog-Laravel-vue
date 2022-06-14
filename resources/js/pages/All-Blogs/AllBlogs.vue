<template>
    <main v-if="loading">
        <Loader/>
    </main>
    <main v-else class="container">
        <div class="row mb-5 g-3">
            <BlogCard
                v-for="post in posts"
                :id="post.id"
                :thumbnail="post.thumbnail"
                :title="post.title"
                :preview="post.preview"
                :date="post.created_at"
            />
        </div>
    </main>
</template>

<script>
import Loader from "../../components/Loader";
import BlogCard from "../../components/BlogCard";
import api from "../../api/api";

export default {
    name: "AllBlogs",
    components: {
        BlogCard,
        Loader
    },
    data: () => ({
        loading: true,
        posts: [],
    }),
    mounted() {
        this.loadPosts()
    },
    methods: {
        loadPosts() {
            api.get('/api/auth/blog/posts').then(res => {
                this.posts = res.data
                this.loading = false
            })
        },
    }
}
</script>

<style scoped>

</style>
