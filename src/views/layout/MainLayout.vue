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
import HeaderComp from "@/components/header-comp";
import FooterComp from "@/components/footer-comp";

export default {
  name: "MainLayout",
  components: {
    FooterComp,
    HeaderComp,
  },
};
</script>

<style scoped></style>
