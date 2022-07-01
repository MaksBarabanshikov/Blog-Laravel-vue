<template>
    <main v-if="getLoading">
        <Loader/>
    </main>
    <main v-else class="container">
        <div class="row mb-5 g-3">
            <BlogCard
                v-for="post in allPosts"
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
import {mapGetters, mapActions} from 'vuex'
export default {
    name: "AllBlogs",
    components: {
        BlogCard,
        Loader
    },
    methods: mapActions(['GET_POSTS_USER']),
    computed: {
        ...mapGetters([
            'allPosts',
            'getLoading'
        ])
    },
    mounted() {
        this.GET_POSTS_USER()
    },
}

</script>

<style scoped>

</style>
