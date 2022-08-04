<template>
  <div class="form-signin w-100 m-auto">
    <Form method="post" @submit="onSubmit">
      <h1 class="h3 mb-3 fw-normal">Admin Авторизация</h1>
      <div class="form-floating">
        <Field
          rules="required|email"
          name="email"
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Почта</label>
        <ErrorMessage
          class="error-message text-danger position-absolute"
          name="email"
        />
      </div>
      <div class="form-floating">
        <Field
          rules="required|min:5"
          name="password"
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label for="floatingPassword">Пароль</label>
        <ErrorMessage
          class="error-message text-danger position-absolute"
          name="password"
        />
      </div>

      <button
        class="w-100 btn btn-lg btn-primary mb-2 position-relative"
        type="submit"
        :disabled="loginAdmin.loading"
      >
        <LoaderComp class="spin" v-if="loginAdmin.loading" />
        <span v-else>Войти</span>
      </button>
      <p class="mt-3 mb-3 text-muted">© Maksim Barabanshikov</p>
    </Form>
  </div>

  <MessagePopup v-if="!!loginAdmin.error" :message="loginAdmin.error" />
</template>

<script>
import LoaderComp from "../../components/loader-comp";
import { defineRule, ErrorMessage, Field, Form } from "vee-validate";
import { mapActions, mapGetters } from "vuex";
import MessagePopup from "@/components/message-popup";

defineRule("email", (value) => {
  // if the field is not a valid email
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "Такая почта не действительна";
  }
  // All is good
  return true;
});

defineRule("required", (value) => {
  if (!value) {
    return "Обязательное поле";
  }

  return true;
});

defineRule("min", (value, [min]) => {
  if (value && value.length < min) {
    return `Пароль должен содержать не менее ${min} символов  `;
  }
  return true;
});

export default {
  name: "AdminAuth",
  components: {
    MessagePopup,
    LoaderComp,
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    ...mapActions(["LOGIN_ADMIN"]),

    onSubmit(data) {
      this.LOGIN_ADMIN(data);
    },
  },
  computed: {
    ...mapGetters(["loginAdmin"]),
  },
};
</script>

<style scoped>
button {
  height: 46px;
}

.spin {
  transform: translate(-50%, -50%);
  font-size: 20px;
}
</style>
