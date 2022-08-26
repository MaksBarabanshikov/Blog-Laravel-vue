<script setup lang="ts">
interface Props {
  post: IPost;
}

interface IPost {
  id: number;
  title: string;
  preview: string;
  comments_count: number;
}

defineProps<Props>();
</script>

<template>
  <section>
    <div class="container">
      <div class="p-4 p-md-5 mb-4 text-white rounded bg-dark">
        <div class="col-md-6 px-0">
          <h1 class="display-4 my-1 fst-italic">
            {{ post.title }}
          </h1>
          <p class="lead my-2">
            {{ post.preview }}
          </p>

          <strong class="d-block text-info my-2">
            Коментирован {{ post.comments_count }} раз
          </strong>
          <p class="lead mb-0">
            <router-link
              :to="{ name: 'post', params: { id: post.id } }"
              class="text-white fw-bold"
            >
              Continue reading...
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "BigBlog",
};
</script>

<style scoped></style>
