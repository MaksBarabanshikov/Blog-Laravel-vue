/* eslint vue/no-reserved-component-names: 0 */
<template>
  <div class="form-signin w-100 m-auto">
    <Form>
      <h1 class="h3 mb-3 fw-normal">Авторизация</h1>

      <div class="form-floating">
        <Field
          id="floatingInput"
          rules="required|email"
          name="email"
          type="email"
          class="form-control"
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
          id="floatingPassword"
          rules="required|min:5"
          name="password"
          type="password"
          class="form-control"
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
      >
        <span>Войти</span>
      </button>
      <router-link to="/reg" type="submit"> Регистрация </router-link>
      <p class="mt-3 mb-3 text-muted">© Maksim Barabanshikov</p>
    </Form>
  </div>
</template>
<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";

// defineRule("email", (value) => {
//   // if the field is not a valid email
//   const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//   if (!regex.test(value)) {
//     return "Такая почта не действительна";
//   }
//   // All is good
//   return true;
// });
// defineRule("required", (value) => {
//   if (!value) {
//     return "Обязательное поле";
//   }
//
//   return true;
// });
// defineRule("min", (value, [min]) => {
//   if (value && value.length < min) {
//     return `Пароль должен содержать не менее ${min} символов  `;
//   }
//
//   return true;
// });

export default {
  name: "AuthUser",
  components: {
    Form,
    Field,
    ErrorMessage,
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
