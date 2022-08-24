<script setup lang="ts">
import LoaderComp from "@/components/loader-comp.vue";
import MessagePopup from "@/components/message-popup.vue";
import { useGetStatisticsQuery } from "@/lib/services/admin/statistics.service";

const { isLoading, isError, isSuccess, data, error } = useGetStatisticsQuery();
</script>
<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Статистика</h1>
  </div>
  <section>
    <LoaderComp v-if="isLoading" />
    <div v-if="isSuccess">
      <h4>Постов: {{ data.posts }}</h4>
      <h4>Пользователей: {{ data.users }}</h4>
    </div>
    <MessagePopup v-if="isError" :message="error.message" />
  </section>
</template>

<script lang="ts">
export default {
  name: "AdminStatistics",
};
</script>

<style scoped></style>
