<script setup lang="ts">
import LoaderComp from "@/components/loader-comp.vue";
import MessagePopup from "@/components/message-popup.vue";
import AdminPostEl from "@/views/Admin/panel/Posts/AdminPostEl.vue";
import { ref } from "vue";
import { useGetPostsAdminQuery } from "@/services/admin/post.service";
import PaginationComp from "@/components/pagination-comp.vue";

const activeView = ref("tile");
const page = ref(1);

const changePage = (newPage: number) => (page.value = newPage);
const changeActive = (value: string) => (activeView.value = value);

const { isLoading, isError, isSuccess, data, error } =
  useGetPostsAdminQuery(page);
</script>
<template>
  <section>
    <div class="d-flex align-items-center mb-4">
      <div class="d-flex align-items-center me-2">
        <button
          class="btn btn-outline-primary mb-0 me-2"
          :class="activeView === 'panel' ? 'active' : ''"
          @click="changeActive('panel')"
        >
          По 1
        </button>
        <button
          class="btn btn-outline-primary mb-0 me-2"
          :class="activeView === 'tile' ? 'active' : ''"
          @click="changeActive('tile')"
        >
          По 4
        </button>
      </div>
    </div>
    <LoaderComp v-if="isLoading" />
    <div v-if="isSuccess">
      <div class="admin-panel__posts" :class="activeView">
        <AdminPostEl
          v-for="post in data.data"
          :id="post.id"
          :key="post.id"
          :title="post.title"
          :thumbnail="post.thumbnail"
          :preview="post.preview"
          :date="post.created_at"
          :comments="post.comments.length"
          :type-block="activeView"
        />
      </div>
      <pagination-comp
        class="my-3"
        :data="data"
        @pagination-change-page="changePage"
      />
    </div>
    <MessagePopup v-if="isError" :message="error.message" />
  </section>
</template>

<script lang="ts">
export default {
  name: "AdminPosts",
};
</script>

<style>
.admin-panel__posts {
  display: grid;
  gap: 10px;
}
.admin-panel__posts.panel {
  grid-template-columns: 1fr;
  align-content: baseline;
}
.admin-panel__posts.tile {
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
}

.admin-panel__posts img {
  max-height: 200px;
  width: 100%;
  margin-bottom: 20px;
}
</style>
