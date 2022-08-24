<script setup lang="ts">
import LoaderComp from "@/components/loader-comp.vue";
import PostView from "@/views/Post/post-view.vue";
import MessagePopup from "@/components/message-popup.vue";
import { useGetCurrentPostQuery } from "@/lib/services/post.service";
import { useRoute } from "vue-router";

const route = useRoute();

const { isLoading, isSuccess, isError, error, data } = useGetCurrentPostQuery(
  route.params.id
);
</script>

<template>
  <LoaderComp v-if="isLoading" />

  <PostView
    v-if="isSuccess"
    :title="data.data.title"
    :date="new Date(data.data.created_at).toLocaleString()"
    :thumbnail="data.data.thumbnail"
    :description="data.data.description"
    :comments="data.data.comments"
  />
  <MessagePopup v-if="isError" :message="error.message" />
</template>

<style scoped>
h1 span {
  font-size: 14px;
}
img {
  margin: auto;
  max-width: 100%;
  max-height: 400px;
}
</style>
