<template>
  <div class="d-flex col-auto align-items-center mb-2">
    <router-link to="/home" class="fs-4 me-2 text-dark text-decoration-none">
      Laravel 9 + Vue 3 Blog
    </router-link>
    <router-link
      to="/admin/login"
      class="fs-4 text-primary text-decoration-none"
    >
      Admin
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HeaderLogo",
};
</script>

<style scoped></style>
