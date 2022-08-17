<script setup lang="ts">
import { useQueryProvider } from "vue-query";

useQueryProvider();
</script>

<template>
  <router-view />
</template>

<style>
#app {
  min-height: 81vh;
}
</style>
