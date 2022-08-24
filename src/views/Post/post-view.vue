<script setup lang="ts">
import CommentsView from "@/views/Post/comments-view.vue";

interface Props {
  title: string;
  date: string;
  thumbnail: string;
  description: string;
}

defineProps<Props>();
</script>
<template>
  <section>
    <div class="post-body mb-5 pb-5">
      <h1 class="d-flex align-items-center">
        {{ title }}
        <span
          class="ms-4 p-2 fs-6 d-inline-block bg-success text-white rounded-pill"
        >
          {{ date }}
        </span>
      </h1>
      <div class="text-center my-4">
        <img :src="thumbnail" alt="Изображение" />
      </div>
      <div v-html="description" />
    </div>
    <CommentsView />
  </section>
</template>

<script lang="ts">
export default {
  name: "PostView",
};
</script>

<style lang="scss" scoped>
h1 span {
  font-size: 14px;
}

img {
  margin: auto;
  max-width: 100%;
  max-height: 400px;
}

.button-loader {
  height: 10px !important;
  margin: 0 0 5px 5px;

  div {
    top: 12px;
  }
}
</style>
