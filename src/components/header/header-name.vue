<script setup lang="ts">
import { useGetNameQuery } from "@/services/auth.service";
import LoaderComp from "@/components/loader-comp.vue";
import MessagePopup from "@/components/message-popup.vue";

const { isLoading, isError, error, data, isSuccess } = useGetNameQuery();
</script>

<template>
  <LoaderComp v-if="isLoading" />
  <h5 v-if="isSuccess" class="mb-0">
    {{ data.name }}
  </h5>
  <MessagePopup v-if="isError" :message="error.message" />
</template>
