<script setup lang="ts">
import { useAuthStore } from "@/lib/stores/auth.store";
import { useLogoutUserMutation } from "@/services/auth.service";
import MessagePopup from "@/components/message-popup.vue";
import LoaderComp from "@/components/loader-comp.vue";
import HeaderName from "@/components/header/header-name.vue";

const authStore = useAuthStore();

const { isLoading, mutate, error, isError } = useLogoutUserMutation();
</script>

<template>
  <div class="col-md-3 d-flex justify-content-end">
    <div v-if="authStore.token === null" class="d-flex align-items-center">
      <button
        type="button"
        class="btn btn-outline-primary me-2"
        @click="$router.push({ name: 'auth' })"
      >
        Войти
      </button>
      <button
        type="button"
        class="btn btn-outline-success me-2"
        @click="$router.push({ name: 'reg' })"
      >
        Регистрация
      </button>
    </div>
    <div v-else class="d-flex align-items-center">
      <header-name></header-name>
      <button
        type="button"
        class="btn btn-outline-danger mx-2"
        :disabled="isLoading"
        @click.prevent="mutate()"
      >
        <LoaderComp v-if="isLoading" />
        <span v-else>Выйти</span>
      </button>
    </div>
  </div>

  <MessagePopup v-if="isError" :message="error.message" />
</template>
