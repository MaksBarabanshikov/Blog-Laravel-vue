<template>
  <div class="wrapper">
    <HeaderComp />
    <main class="container">
      <router-view />
    </main>
    <FooterComp />
  </div>
</template>

<script>
import HeaderComp from "@/components/header/header-comp.vue";
import FooterComp from "@/components/footer-comp.vue";

export default {
  name: "MainLayout",
  components: {
    FooterComp,
    HeaderComp,
  },
};
</script>

<style scoped></style>
