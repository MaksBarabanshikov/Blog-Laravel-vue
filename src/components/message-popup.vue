<template>
  <div class="form-alert alert alert-danger position-fixed m-0" role="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "MessagePopup",
  props: {
    message: {
      type: String,
      required: true,
      default: null,
    },
  },
};
</script>

<style scoped></style>
