<script setup lang="ts">
import LoaderComp from "@/components/loader-comp.vue";
import MessagePopup from "@/components/message-popup.vue";
import CreditorComp from "@/components/creditor-comp.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  useGetPostAdminQuery,
  useUpdatePostAdminMutation,
} from "@/services/admin/post.service";

const route = useRoute();

const { isLoading, isSuccess, isError, data, error } = useGetPostAdminQuery(
  route.params.id
);
const {
  isLoading: isLoadingEdit,
  isError: isErrorEdit,
  mutate,
  error: errorEdit,
} = useUpdatePostAdminMutation();

const description = ref("");
const imageFile: any = ref("");
const imageUrl: any = ref("");

const onSubmit = (values: any) => {
  const newPost = {
    title: values.title,
    description: values.description,
    preview: values.preview,
    thumbnail: imageUrl.value,
  };
  mutate({ ...newPost });
};
const currentValue = (value: string) => (description.value = value);

const uploadImage = (event: Event) => {
  if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    alert("Файловые API не полностью поддерживаются в этом браузере.");
  }

  const target = event.target as HTMLInputElement;

  const files = target.files;

  return (imageFile.value = files![0]);
};

watch(imageFile, (next: Blob) => {
  const fileReader = new FileReader();

  fileReader.readAsDataURL(next);

  fileReader.onload = () => {
    imageUrl.value = fileReader.result;
  };
});
watch(data, (next) => (description.value = next.data.description));
</script>
<template>
  <div>
    <LoaderComp v-if="isLoading" />
    <h4 class="py-3">Редактировать пост</h4>
    <Form v-if="isSuccess" enctype="multipart/form-data" @submit="onSubmit">
      <div class="form-floating">
        <Field
          id="floatingTitle"
          name="title"
          type="text"
          class="form-control"
          placeholder="Название поста"
          :value="data.data.title"
        />
        <ErrorMessage
          class="error-message text-danger position-absolute"
          name="title"
        />
        <label for="floatingTitle">Заголовок</label>
      </div>
      <div class="form-floating">
        <Field
          id="floatingPreview"
          name="preview"
          type="email"
          class="form-control"
          placeholder="Краткое описание блога"
          :value="data.data.preview"
        />
        <ErrorMessage
          class="error-message text-danger position-absolute"
          name="email"
        />
        <label for="floatingPreview">Описание</label>
      </div>
      <img
        v-if="imageFile !== null"
        id="previewImage"
        :src="imageUrl"
        :alt="data.data.title"
      />
      <img v-else :src="data.data.thumbnail" :alt="data.data.title" />

      <label class="position-static d-flex flex-column px-0">
        Превью
        <input
          class="mt-2"
          name="thumbnail"
          type="file"
          accept="image/png, image/gif, image/jpeg"
          @change.prevent="uploadImage"
        />
      </label>
      <label class="my-4"> Контент поста </label>
      <CreditorComp :content="description" @inputListener="currentValue" />
      <Field
        v-model="description"
        name="description"
        type="text"
        class="visually-hidden"
      />
      <button
        class="form-button w-50 btn btn-lg btn-primary mb-2 position-relative mt-4"
        type="submit"
      >
        <LoaderComp v-if="isLoadingEdit" />
        <span v-else>Добавить пост</span>
      </button>
    </Form>
    <MessagePopup v-if="isError" :message="error.message" />
    <MessagePopup v-if="isErrorEdit" :message="errorEdit.message" />
  </div>
</template>
<script lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  name: "AddPost",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
};
</script>

<style scoped>
img {
  max-width: 300px;
  max-height: 300px;
}
</style>
