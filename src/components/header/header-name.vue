<script setup lang="ts">
import { AuthService } from "@/lib/services/auth.service";
import { useQuery } from "vue-query/esm";
import LoaderComp from "@/components/loader-comp.vue";
import MessagePopup from "@/components/message-popup.vue";

function useGetNameQuery() {
  return useQuery("name", AuthService.getName);
}

const { isLoading, isError, error, data, isSuccess } = useGetNameQuery();
</script>

<template>
  <LoaderComp v-if="isLoading" />
  <h5 v-if="isSuccess" class="mb-0">
    {{ data.name }}
  </h5>
  <MessagePopup v-if="isError" :message="error.message" />
</template>
