<template>
  <LoaderComp v-if="currentPostUser.loading" />

  <PostView
    v-if="!!currentPostUser.data"
    :title="currentPostUser.data.title"
    :date="new Date(currentPostUser.data.created_at).toLocaleString()"
    :thumbnail="currentPostUser.data.thumbnail"
    :description="currentPostUser.data.description"
    :comments="currentPostUser.data.comments"
  />
  <MessagePopup
    v-if="!!currentPostUser.error"
    :message="currentPostUser?.error"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LoaderComp from "../../components/loader-comp";
import MessagePopup from "../../components/message-popup";
import PostView from "../Post/post-view";

export default {
  name: "PostLayout",
  components: {
    PostView,
    MessagePopup,
    LoaderComp,
  },
  methods: {
    ...mapActions(["GET_POST_USER"]),
  },
  computed: {
    ...mapGetters(["currentPostUser"]),
  },
  mounted() {
    this.GET_POST_USER(this.$route.params);
  },
};
</script>

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
