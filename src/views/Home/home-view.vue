<template>
  <LoaderComp v-if="!!mostCommented.loading" />
  <main v-if="!!mostCommented.data">
    <BigBlog :post="mostCommented.data.bigPost" />
    <BlogsView :posts="mostCommented.data.posts" />
  </main>
  <MessagePopup
    v-if="!!mostCommented.error"
    :message="mostCommented.error.message"
  />
</template>

<script>
import BlogsView from "./blogs-view.vue";
import BigBlog from "./big-blog";
import { mapActions, mapGetters } from "vuex";
import LoaderComp from "@/components/loader-comp";
import MessagePopup from "@/components/message-popup";

export default {
  name: "HomeView",
  components: {
    MessagePopup,
    LoaderComp,
    BigBlog,
    BlogsView,
  },
  methods: {
    ...mapActions(["GET_MOST_COMMENTED"]),
  },
  computed: {
    ...mapGetters(["mostCommented"]),
  },
  mounted() {
    this.GET_MOST_COMMENTED();
  },
};
</script>

<style scoped></style>
