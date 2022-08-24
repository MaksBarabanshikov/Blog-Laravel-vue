<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Пост</h1>
    <router-link
      v-if="$route.name === 'AdminGetPosts'"
      :to="{ name: 'AddPost' }"
      class="btn btn-success"
    >
      Добавить пост
    </router-link>
    <router-link v-else :to="{ name: 'AdminGetPosts' }" class="btn btn-success">
      К постам
    </router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "AdminPostLayout",
};
</script>

<style scoped></style>
