<template>
  <div class="col-md-3 d-flex justify-content-end">
    <div class="d-flex align-items-center">
      <button
        type="button"
        class="btn btn-outline-primary me-2"
        @click="$router.push({ name: 'auth' })"
      >
        Войти
      </button>
      <button
        type="button"
        class="btn btn-outline-success me-2"
        @click="$router.push({ name: 'reg' })"
      >
        Регистрация
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderButtons",
};
</script>

<style scoped></style>
