<script setup lang="ts">
import { useQueryProvider } from "vue-query";
import { VueQueryDevTools } from "vue-query/devtools";

useQueryProvider();
</script>

<template>
  <router-view />
  <VueQueryDevTools />
</template>

<style>
#app {
  min-height: 81vh;
}
</style>
