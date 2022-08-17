<script>
import LaravelVuePagination from "laravel-vue-pagination";
export default {
  name: "PaginationComp",
  components: {
    paginationView: LaravelVuePagination,
  },
};
</script>

<template>
  <pagination-view />
</template>
