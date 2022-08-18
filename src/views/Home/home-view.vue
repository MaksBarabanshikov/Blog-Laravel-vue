<script setup lang="ts">
import BlogsView from "./blogs-view.vue";
import BigBlog from "./big-blog.vue";
import LoaderComp from "@/components/loader-comp.vue";
import MessagePopup from "@/components/message-popup.vue";
import { PostService } from "@/lib/services/post.service";
import { useQuery } from "vue-query";
// import {IMostCommented} from "@/types/api";

function useMostCommentedQuery() {
  return useQuery("most-commented", () => PostService.mostCommented);
}

const { isLoading, isError, error, data, isSuccess } = useMostCommentedQuery();

// TODO поправить BigBlog и BlogsView
</script>

<template>
  <LoaderComp v-if="isLoading" />
  <main v-if="isSuccess">
    <BigBlog :post="data[0]" />
    <BlogsView :posts="[data[1], data[2]]" />
  </main>
  <MessagePopup v-if="isError" :message="error.message" />
</template>

<style scoped></style>
