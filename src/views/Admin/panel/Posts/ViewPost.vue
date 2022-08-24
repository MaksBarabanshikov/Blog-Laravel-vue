<script setup lang="ts">
import CommentsView from "@/views/Post/comments-view.vue";
import LoaderComp from "@/components/loader-comp.vue";
import MessagePopup from "@/components/message-popup.vue";
import { useGetPostAdminQuery } from "@/lib/services/admin/post.service";
import { useRoute } from "vue-router";

const router = useRoute();

const id = router.params.id;

const { isLoading, isSuccess, isError, data, error } = useGetPostAdminQuery(id);
</script>
<template>
  <LoaderComp v-if="isLoading" />
  <div v-if="isSuccess">
    <div class="post-body mb-5 pb-5">
      <h1 class="d-flex align-items-center">
        {{ data.data.title }}
        <span
          class="ms-4 p-2 fs-6 d-inline-block bg-success text-white rounded-pill"
        >
          {{ new Date(data.data.created_at).toLocaleString() }}
        </span>
      </h1>
      <div class="text-center my-4">
        <img :src="data.data.thumbnail" alt="Изображение" />
      </div>
      <div v-html="data.data.description" />
    </div>
    <CommentsView />
  </div>
  <MessagePopup v-if="isError" :message="error.message" />
</template>

<script lang="ts">
export default {
  name: "ViewPost",
};
</script>

<style scoped>
img {
  margin: auto;
  max-width: 100%;
  max-height: 400px;
}
</style>
