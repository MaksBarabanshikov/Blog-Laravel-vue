<template>
  <header class="py-3 mb-4 border-bottom px-3 sticky-top bg-white">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between"
      >
        <header-logo></header-logo>
        <header-nav></header-nav>
        <header-buttons></header-buttons>
      </div>
    </div>
  </header>
</template>

<script>
import HeaderLogo from "./header-logo.vue";
import HeaderNav from "./header-nav.vue";
import HeaderButtons from "./header-buttons.vue";
export default {
  name: "HeaderComp",
  components: { HeaderButtons, HeaderNav, HeaderLogo },
};
</script>
