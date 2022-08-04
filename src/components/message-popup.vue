<template>
  <div class="form-alert alert alert-danger position-absolute m-0" role="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
    },
  },
  name: "MessagePopup",
};
</script>

<style scoped></style>
