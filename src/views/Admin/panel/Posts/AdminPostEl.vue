<script setup lang="ts">
interface Props {
  id: number;
  title: string;
  preview: string;
  thumbnail: string;
  date: string;
  comments: number;
  typeBlock: string;
}

defineProps<Props>();

import { useDeletePostAdminMutation } from "@/lib/services/admin/post.service";

const { mutate } = useDeletePostAdminMutation();
</script>

<template>
  <div
    class="admin-panel__posts_post bg-white border rounded-3 overflow-hidden d-flex flex-column h-100"
  >
    <div
      class="d-flex justify-content-between align-items-center border-bottom bg-light p-3"
    >
      <h1 class="fs-5 mb-0 text-secondary text-uppercase">
        {{ title }}
      </h1>
      <span>
        {{ new Date(date).toLocaleString() }}
      </span>
    </div>
    <div
      class="post-content p-3 d-flex justify-content-between flex-grow-1"
      :class="
        typeBlock === 'panel' ? 'flex-row align-items-center' : 'flex-column'
      "
    >
      <div>
        <img :src="thumbnail" alt="Пост" />
        <p class="mb-2">
          {{ preview }}
        </p>
        <p class="mb-0">Комментариев: {{ comments }}</p>
      </div>

      <div class="d-flex" :class="typeBlock !== 'panel' ? 'mt-1' : ''">
        <router-link
          :to="{ name: 'ViewPost', params: { id } }"
          class="btn btn-info me-2"
        >
          Просмотр
        </router-link>
        <router-link
          :to="{ name: 'EditPost', params: { id } }"
          class="btn btn-warning me-2"
        >
          Редактировать
        </router-link>
        <button class="btn btn-danger" @click.prevent="mutate(id)">
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AdminPostEl",
};
</script>

<style scoped></style>
