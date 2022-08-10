<script>
import LaravelVuePagination from "laravel-vue-pagination";
export default {
  name: "pagination-comp",
  components: {
    paginationView: LaravelVuePagination,
  },
};
</script>

<template>
  <pagination-view />
</template>
