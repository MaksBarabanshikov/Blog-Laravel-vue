<template>
  <section>
    <div class="container">
      <div class="row mb-2">
        <mini-blog
          v-for="post in posts"
          :key="post.id"
          :id="post.id"
          :title="post.title"
          :preview="post.preview"
          :thumbnail="post.thumbnail"
          :comments_count="post.comments_count"
        />
      </div>
    </div>
  </section>
</template>

<script>
import MiniBlog from "@/views/Home/mini-blog";
export default {
  name: "BlogsView",
  components: { MiniBlog },
  props: {
    posts: {
      type: Array,
    },
  },
};
</script>

<style scoped></style>
