<script setup lang="ts">
import MessagePopup from "@/components/message-popup.vue";
import { useDeleteUserMutation } from "@/lib/services/admin/user.service";

const { isError, error, mutate } = useDeleteUserMutation();
interface Props {
  id: number;
  name: string;
  email: string;
  date: string;
}

defineProps<Props>();
</script>

<template>
  <div class="col-2">
    <div
      class="border rounded d-flex flex-column justify-content-between h-100 p-3 text-center"
    >
      <div>
        <h4 class="mb-2">{{ name }}</h4>
        <p class="mb-2">{{ email }}</p>
        <span>Зарегистрирован: {{ date }}</span>
      </div>
      <div class="d-flex justify-content-around">
        <button class="btn w-100 btn-danger fs-6" @click.prevent="mutate(id)">
          Удалить
        </button>
      </div>
    </div>
  </div>
  <MessagePopup v-if="isError" :message="error.message" />
</template>

<script lang="ts">
export default {
  name: "AdminUserEl",
};
</script>

<style scoped></style>
