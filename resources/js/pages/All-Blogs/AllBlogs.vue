<template>
    <main class="container">
        <Loader v-if="allPosts.loading"/>
        <div v-if="!!allPosts.posts?.data"
             class="row mb-5 g-3"
        >
            <BlogCard v-for="post in allPosts.posts.data"
                      :key="post.id"
                      :id="post.id"
                      :thumbnail="post.thumbnail"
                      :title="post.title"
                      :preview="post.preview"
                      :date="post.created_at"
            />
        </div>
        <MessagePopup v-if="!!allPosts.error" :message="allPosts.error"/>
    </main>
</template>

<script>
import Loader from "../../components/Loader";
import BlogCard from "../../components/BlogCard";
import {mapGetters, mapActions} from 'vuex'
import MessagePopup from "../../components/MessagePopup";
export default {
    name: "AllBlogs",
    components: {
        MessagePopup,
        BlogCard,
        Loader
    },
    methods: mapActions(['GET_POSTS_USER']),
    computed: {
        ...mapGetters([
            'allPosts',
        ])
    },
    mounted() {
        this.GET_POSTS_USER()
    },
}

</script>

<style scoped>

</style>
