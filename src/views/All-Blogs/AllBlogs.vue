<template>
  <main class="container">
    <Loader v-if="allPosts.loading" />
    <div v-if="!!allPosts.posts?.data">
      <div class="row mb-5 g-3">
        <BlogCard
          v-for="post in allPosts.posts.data"
          :key="post.id"
          :id="post.id"
          :thumbnail="post.thumbnail"
          :title="post.title"
          :preview="post.preview"
          :date="post.created_at"
        />
      </div>
      <pagination-comp
        :data="allPosts.posts"
        @pagination-change-page="getPosts"
      />
    </div>
    <MessagePopup v-if="!!allPosts.error" :message="allPosts.error" />
  </main>
</template>

<script>
import Loader from "@/components/loader-comp";
import BlogCard from "@/components/blog-card";
import store from "@/store";
import { mapGetters, mapActions } from "vuex";
import MessagePopup from "@/components/message-popup";
import PaginationComp from "@/components/pagination-comp";
export default {
  name: "AllBlogs",
  components: {
    PaginationComp,
    MessagePopup,
    BlogCard,
    Loader,
  },
  methods: {
    ...mapActions(["GET_POSTS_USER"]),
    getPosts: (page) => store.dispatch("GET_POSTS_USER", { page }),
  },
  computed: {
    ...mapGetters(["allPosts"]),
  },
  mounted() {
    this.GET_POSTS_USER({ page: 1 });
  },
};
</script>

<style scoped></style>
