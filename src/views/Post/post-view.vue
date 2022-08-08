<template>
  <section>
    <div class="post-body mb-5 pb-5">
      <h1 class="d-flex align-items-center">
        {{ title }}
        <span
          class="ms-4 p-2 fs-6 d-inline-block bg-success text-white rounded-pill"
        >
          {{ date }}
        </span>
      </h1>
      <div class="text-center my-4">
        <img :src="thumbnail" alt="Изображение" />
      </div>
      <div v-html="description" />
      <Form class="mt-5" @submit="onSubmit">
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
        <button class="btn btn-primary position-relative" type="submit">
          <LoaderComp
            class="button-loader position-static"
            v-if="sendComment.loading"
          />
          <span v-else>Оставить комментарий</span>
        </button>
      </Form>
    </div>
    <CommentsView v-if="comments.length" :comments="comments" />
    <h2 v-else-if="!comments.length" class="my-5 text-info">Комментарий нет</h2>
  </section>
  <MessagePopup v-if="!!sendComment.error" :message="sendComment.error" />
</template>

<script>
import CommentsView from "./comments-view";
import { Field, Form, ErrorMessage, defineRule } from "vee-validate";
import MessagePopup from "@/components/message-popup";
import { mapActions, mapGetters } from "vuex";
import LoaderComp from "@/components/loader-comp";
import axios from "@/utils/axios";

defineRule("required", (value) => {
  if (!value) {
    return "Комментарий не должен быть пустым";
  }
  return true;
});

export default {
  props: {
    title: {
      type: String,
    },
    date: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    description: {
      type: String,
    },
    comments: {
      type: Array,
    },
  },
  name: "PostView",
  components: {
    LoaderComp,
    MessagePopup,
    Field,
    Form,
    ErrorMessage,
    CommentsView,
  },
  methods: {
    ...mapActions(["SEND_COMMENT", "GET_POST_USER"]),
    onSubmit(values) {
      this.SEND_COMMENT({
        id: this.$route.params,
        message: values.text,
      }).then(() => {
        this.GET_POST_USER(this.$route.params);
      });
    },
  },
  computed: {
    ...mapGetters(["sendComment"]),
  },
  mounted() {
    const { data, status } = axios.get(
      `/api/posts/comment/${this.$route.params.id}`
    );

    console.log(data, status);
  },
};
</script>

<style lang="scss" scoped>
h1 span {
  font-size: 14px;
}
img {
  margin: auto;
  max-width: 100%;
  max-height: 400px;
}

.button-loader {
  height: 10px !important;
  margin: 0 0 5px 5px;

  div {
    top: 12px;
  }
}
</style>
