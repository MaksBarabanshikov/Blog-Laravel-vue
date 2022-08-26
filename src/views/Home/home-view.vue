<script setup lang="ts">
import BlogsView from "./blogs-view.vue";
import BigBlog from "./big-blog.vue";
import LoaderComp from "@/components/loader-comp.vue";
import MessagePopup from "@/components/message-popup.vue";
import { useMostCommentedQuery } from "@/lib/services/post.service";

const { isLoading, isError, error, data, isSuccess } = useMostCommentedQuery();

// const bigBlog: Ref<IPost | undefined>  = ref(undefined)
// const smallBlog:Ref<IPost[] | undefined> = ref(undefined)

// watch(data, (next: IPost[]) => {
//   const keys = Object.keys(next)
//   console.log(keys)
//   bigBlog.value = next.shift()
// })
//
// watch(bigBlog, (next: any) => {
//   console.log(bigBlog.value)
//   return next
// })

// TODO поправить BigBlog и BlogsView
</script>

<template>
  <LoaderComp v-if="isLoading" />
  <main v-if="isSuccess">
    <BigBlog v-if="data[0]" :post="data[0]" />
    <BlogsView v-if="data[1] && data[2]" :posts="[data[1], data[2]]" />
  </main>
  <MessagePopup v-if="isError" :message="error.message" />
</template>

<style scoped></style>
