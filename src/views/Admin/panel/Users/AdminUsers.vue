<script setup lang="ts">
import LoaderComp from "@/components/loader-comp.vue";
import MessagePopup from "@/components/message-popup.vue";
import AdminUserEl from "@/views/Admin/panel/Users/AdminUserEl.vue";
import { useGetUsersQuery } from "@/services/admin/user.service";
import { normalizeDate } from "@/helper/helper";

const { isLoading, isSuccess, isError, error, data } = useGetUsersQuery();
</script>
<template>
  <LoaderComp v-if="isLoading" />
  <div v-if="isSuccess" class="admin-panel__users row g-4">
    <AdminUserEl
      v-for="user in data.data"
      :id="user.id"
      :key="user.id"
      :name="user.name"
      :email="user.email"
      :date="normalizeDate(user.created_at)"
    />
  </div>
  <MessagePopup v-if="isError" :message="error.message" />
</template>

<script lang="ts">
export default {
  name: "AdminUsers",
};
</script>

<style scoped></style>
