<template>
  <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
    <li>
      <router-link to="/home" class="nav-link px-2">Главная</router-link>
    </li>
    <li>
      <router-link to="/all-blogs" class="nav-link px-2">Все блоги</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "HeaderNav",
};
</script>

<style scoped></style>
