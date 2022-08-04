<template>
  <main>
    <BigBlog />
    <BlogsView />
  </main>
</template>

<script>
import BlogsView from "./blogs-view.vue";
import BigBlog from "./big-blog";

export default {
  name: "HomeView",
  components: {
    BigBlog,
    BlogsView,
  },
};
</script>

<style scoped></style>
