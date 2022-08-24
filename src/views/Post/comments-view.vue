<script setup lang="ts">
import LoaderComp from "@/components/loader-comp.vue";
import MessagePopup from "@/components/message-popup.vue";
import CommentItem from "@/views/Post/comment-item.vue";
import PaginationComp from "@/components/pagination-comp.vue";
import { validateSendComment } from "@/helper/schemas";
import {
  useGetCommentsQuery,
  useSendCommentMutation,
} from "@/lib/services/comment.service";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const page = ref(1);

const changeId = (newPage: number) => (page.value = newPage);

const {
  isLoading: sendLoading,
  isError: sendError,
  mutate,
} = useSendCommentMutation();

const { isLoading, isError, isSuccess, data, error } =
  useGetCommentsQuery(page);

const onSubmit = (values: any) => {
  const id = route.params.id;
  const text = values.text;
  mutate({ id, text });
};
</script>

<template>
  <div>
    <Form
      :validation-schema="validateSendComment"
      class="mt-5"
      @submit="onSubmit"
    >
      <div class="form-floating">
        <Field
          id="floatingTextarea2"
          name="text"
          rules="required"
          class="form-control"
          placeholder="Leave a comment here"
          style="height: 100px"
        ></Field>
        <label for="floatingTextarea2">Оставьте комментарий</label>
        <ErrorMessage
          name="text"
          class="error-message text-danger position-absolute"
        />
      </div>
      <button class="btn btn-primary position-relative" type="submit">
        <LoaderComp v-if="sendLoading" class="button-loader position-static" />
        <span v-else>Оставить комментарий</span>
      </button>
    </Form>
    <LoaderComp v-if="isLoading" />
    <div v-if="isSuccess">
      <div v-if="data.data.length">
        <div class="comments mt-5">
          <h1 class="fs-3">Комментарии</h1>
          <div class="comments__body">
            <div class="my-3 p-3 bg-body border rounded shadow-sm">
              <CommentItem
                v-for="comment in data.data"
                :key="comment"
                :text="comment.text"
                :date="new Date(comment.created_at).toLocaleString()"
                :name="comment.user.name"
              />
            </div>
          </div>
        </div>
        <pagination-comp :data="data" @pagination-change-page="changeId" />
      </div>
      <h2 v-else class="my-5 text-info">Комментарий нет</h2>
    </div>
    <MessagePopup v-if="isError || sendError" :message="error.message" />
  </div>
</template>

<script lang="ts">
import { ErrorMessage, Field, Form } from "vee-validate";

export default {
  name: "CommentsView",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
};
</script>

<style scoped></style>
