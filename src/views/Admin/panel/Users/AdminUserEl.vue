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
        <button
          class="btn w-100 btn-danger fs-6"
          @click.prevent="DELETE_USER({ id })"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AdminUserEl",
  props: {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  methods: {
    ...mapActions(["DELETE_USER"]),
  },
};
</script>

<style scoped></style>
