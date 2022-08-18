<script setup lang="ts">
import LoaderComp from "@/components/loader-comp.vue";
import MessagePopup from "@/components/message-popup.vue";
import { toFormValidator } from "@vee-validate/zod";
import { object, string } from "zod";
import { ILogin } from "@/types/auth";
import { useMutation } from "vue-query";
import { AuthService } from "@/lib/services/auth.service";
import { useRouter } from "vue-router";
import { ITokenResponse } from "@/types/api";
import { useAuthStore } from "@/lib/stores/auth.store";

const router = useRouter();
const authStore = useAuthStore();

const validationSchema = toFormValidator(
  object({
    email: string()
      .nonempty("Обязательное поле")
      .email({ message: "Некорректная почта" }),
    password: string()
      .nonempty("Обязательное поле")
      .min(5, { message: "Не менее 5 символов" }),
  })
);

const afterSuccessLogin = (data: ITokenResponse) => {
  authStore.setToken(data.plainTextToken);
  router.push({ name: "blog" });
};

const { isLoading, mutate, error, isError } = useMutation(
  (credentials: ILogin) => AuthService.loginUser(credentials), // TODO поправить
  {
    onSuccess: (data: ITokenResponse) => afterSuccessLogin(data),
  }
);

const onSubmit = (values: ILogin) => mutate(values);
</script>

<template>
  <div class="form-signin w-100 m-auto">
    <Form :validation-schema="validationSchema" @submit="onSubmit">
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
        :disabled="isLoading"
      >
        <LoaderComp v-if="isLoading" class="spin" />
        <span v-else>Войти</span>
      </button>
      <router-link to="/reg" type="submit"> Регистрация </router-link>
      <p class="mt-3 mb-3 text-muted">© Maksim Barabanshikov</p>
    </Form>
  </div>
  <MessagePopup v-if="isError" :message="error.message" />
</template>

<script lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";

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
