<script setup lang="ts">
import MessagePopup from "@/components/message-popup.vue";
import LoaderComp from "@/components/loader-comp.vue";
import { validationLogin } from "@/helper/schemas";
import { useLoginAdminMutation } from "@/lib/services/auth.service";
import { ILogin } from "@/types/auth";

const { isLoading, isError, error, mutate } = useLoginAdminMutation();

const onSubmit = (values: ILogin) => mutate(values);
</script>

<template>
  <div class="form-signin w-100 m-auto">
    <Form :validation-schema="validationLogin" @submit="onSubmit">
      <h1 class="h3 mb-3 fw-normal">Admin Авторизация</h1>
      <div class="form-floating">
        <Field
          id="floatingInput"
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
        :disabled="isLoading"
      >
        <LoaderComp v-if="isLoading" class="spin" />
        <span v-else>Войти</span>
      </button>
      <p class="mt-3 mb-3 text-muted">© Maksim Barabanshikov</p>
    </Form>
  </div>

  <MessagePopup v-if="isError" :message="error.message" />
</template>

<script lang="ts">
import { ErrorMessage, Field, Form } from "vee-validate";

export default {
  name: "AdminAuth",
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
