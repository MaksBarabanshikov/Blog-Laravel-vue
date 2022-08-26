<script setup lang="ts">
import MiniBlog from "@/views/Home/mini-blog.vue";

interface Props {
  posts: IMiniPost[];
}

interface IMiniPost {
  id: number;
  title: string;
  preview: string;
  thumbnail: string;
  comments_count: number;
}

defineProps<Props>();
</script>

<template>
  <section>
    <div class="container">
      <div class="row mb-2">
        <mini-blog
          v-for="post in posts"
          :id="post.id"
          :key="post.id"
          :title="post.title"
          :preview="post.preview"
          :thumbnail="post.thumbnail"
          :comments_count="post.comments_count"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "BlogsView",
};
</script>

<style scoped></style>
