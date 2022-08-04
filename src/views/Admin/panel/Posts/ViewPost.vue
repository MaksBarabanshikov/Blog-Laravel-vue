<template>
  <div>
    <Loader v-if="currentPost.loading" />
    <div v-else-if="!!currentPost.data && currentPost.loading === false">
      <div class="post-body mb-5 pb-5">
        <h1 class="d-flex align-items-center">
          {{ currentPost.data.title }}
          <span
            class="ms-4 p-2 fs-6 d-inline-block bg-success text-white rounded-pill"
          >
            {{ new Date(currentPost.data.created_at).toLocaleString() }}
          </span>
        </h1>
        <div class="text-center my-4">
          <img :src="currentPost.data.thumbnail" alt="Изображение" />
        </div>
        <div v-html="currentPost.data.description" />
      </div>
      <Form class="mt-5">
        <div class="form-floating">
          <Field
            name="text"
            rules="required"
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style="height: 100px"
          ></Field>
          <label for="floatingTextarea2">Оставьте комментарий</label>
          <ErrorMessage
            name="text"
            class="error-message text-danger position-absolute"
          />
        </div>
        <button class="btn btn-primary" type="submit" @click="getLog">
          Оставить комментарий
        </button>
      </Form>
      <CommentsView
        v-if="currentPost.data.comments.length"
        :comments="currentPost.data.comments"
      />
      <h2 v-else-if="!currentPost.data.comments.length" class="mt-5 text-info">
        Комментарий нет
      </h2>
    </div>
    <h1 class="text-danger" v-if="currentPost.error !== null">
      {{ currentPost.error }}
    </h1>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ErrorMessage, Field, Form } from "vee-validate";
import CommentsView from "@/views/Post/comments-view";
import Loader from "@/components/loader-comp";

export default {
  name: "ViewPost",
  components: {
    Field,
    Form,
    ErrorMessage,
    CommentsView,
    Loader,
  },
  methods: {
    ...mapActions(["GET_CURRENT_POST"]),
  },
  computed: {
    ...mapGetters(["currentPost"]),
  },
  mounted() {
    console.log(this.$route.params);
    this.GET_CURRENT_POST(this.$route.params);
  },
};
</script>

<style scoped>
img {
  margin: auto;
  max-width: 100%;
  max-height: 400px;
}
</style>
