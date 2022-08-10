<template>
  <div>
    <LoaderComp v-if="getComments.loading" />
    <div v-if="!!getComments.data && !!getComments.data.length">
      <div class="comments mt-5">
        <h1 class="fs-3">Комментарии</h1>
        <div class="comments__body">
          <div class="my-3 p-3 bg-body border rounded shadow-sm">
            <CommentItem
              v-for="comment in getComments.data"
              :key="comment"
              :text="comment.text"
              :date="new Date(comment.created_at).toLocaleString()"
              :name="comment.user.name"
            />
          </div>
        </div>
      </div>
      <pagination-comp
        :data="getComments"
        @pagination-change-page="getCommentsPage"
      />
    </div>
    <h2
      v-if="!!getComments.data && !!!getComments.data.length"
      class="my-5 text-info"
    >
      Комментарий нет
    </h2>
  </div>
</template>

<script>
import CommentItem from "./comment-item";
import LoaderComp from "@/components/loader-comp";
import { mapActions, mapGetters } from "vuex";
import PaginationComp from "@/components/pagination-comp";
import store from "@/store";
import router from "@/router";

export default {
  name: "CommentsView",
  components: {
    PaginationComp,
    LoaderComp,
    CommentItem,
  },
  methods: {
    ...mapActions(["GET_COMMENT"]),
    getCommentsPage: (page) =>
      store.dispatch("GET_COMMENT", {
        id: router.currentRoute._value.params.id,
        page,
      }),
  },
  computed: {
    ...mapGetters(["getComments"]),
  },
  mounted() {
    this.GET_COMMENT({ id: router.currentRoute._value.params.id, page: 1 });
  },
};
</script>

<style scoped></style>
