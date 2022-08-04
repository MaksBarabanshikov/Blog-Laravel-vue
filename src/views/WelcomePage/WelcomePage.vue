<template>
  <section
    class="welcome-page position-absolute d-flex align-items-center justify-content-center bg-dark"
  >
    <div class="text-center text-white">
      <h1 class="fs-1">Добро пожаловать в мой блог</h1>
      <button
        type="button"
        class="btn btn-success me-2"
        @click="$router.push({ name: 'blog' })"
      >
        Перейти в блог
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "WelcomePage",
};
</script>

<style scoped>
section {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
