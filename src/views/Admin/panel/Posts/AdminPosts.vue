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
    <Loader v-if="getPostsAdmin.loading" />
    <div v-else-if="!!getPostsAdmin.data && getPostsAdmin.loading === false">
      <div class="admin-panel__posts" :class="activeView">
        <AdminPostEl
          v-for="post in getPostsAdmin.data"
          :key="post.id"
          :id="post.id"
          :title="post.title"
          :thumbnail="post.thumbnail"
          :preview="post.preview"
          :date="post.created_at"
          :comments="post.comments.length"
          :typeBlock="activeView"
        />
      </div>
      <pagination-comp
        class="my-3"
        :data="getPostsAdmin"
        @pagination-change-page="getPosts"
      />
    </div>
  </section>
</template>

<script>
import AdminPostEl from "./AdminPostEl";
import { mapActions, mapGetters } from "vuex";
import Loader from "../../../../components/loader-comp";
import PaginationComp from "@/components/pagination-comp";
import store from "@/store";

export default {
  name: "AdminPosts",
  components: { PaginationComp, Loader, AdminPostEl },
  data: () => ({
    activeView: "tile",
  }),
  methods: {
    ...mapActions(["GET_ALL_POST"]),
    changeActive: (value) => {
      this.activeView = value;
    },
    getPosts: (page) => store.dispatch("GET_ALL_POST", { page }),
  },
  computed: {
    ...mapGetters(["getPostsAdmin"]),
  },
  mounted() {
    this.GET_ALL_POST({ page: 1 });
  },
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
