<script setup lang="ts">
import BlogCard from "@/components/blog-card.vue";
import MessagePopup from "@/components/message-popup.vue";
import PaginationComp from "@/components/pagination-comp.vue";
import LoaderComp from "@/components/loader-comp.vue";
import { useGetPostsMutation } from "@/lib/services/post.service";
import { onMounted } from "vue";

const { isLoading, error, isError, isSuccess, data, mutate } =
  useGetPostsMutation();

onMounted(() => mutate(1));
</script>

<template>
  <main class="container">
    <LoaderComp v-if="isLoading" />
    <div v-if="isSuccess">
      <div class="row mb-5 g-3">
        <BlogCard
          v-for="post in data.data"
          :id="post.id"
          :key="post.id"
          :thumbnail="post.thumbnail"
          :title="post.title"
          :preview="post.preview"
          :date="post.created_at"
        />
      </div>
      <pagination-comp :data="data" @pagination-change-page="mutate" />
    </div>
    <MessagePopup v-if="isError" :message="error.message" />
  </main>
</template>

<style scoped></style>
