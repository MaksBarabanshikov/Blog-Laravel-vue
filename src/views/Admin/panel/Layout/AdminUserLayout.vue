<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Пользователи</h1>
  </div>
  <section>
    <div class="row g-4">
      <AdminUsers />
    </div>
  </section>
</template>

<script>
import AdminUsers from "../Users/AdminUsers.vue";
export default {
  name: "AdminUserLayout",
  components: { AdminUsers },
};
</script>

<style scoped></style>
