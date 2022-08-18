<script setup lang="ts">
import LoaderComp from "@/components/loader-comp.vue";
import MessagePopup from "@/components/message-popup.vue";
import { toFormValidator } from "@vee-validate/zod";
import { object, string } from "zod";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/lib/stores/auth.store";
import { useMutation } from "vue-query";
import { ITokenResponse } from "@/types/api";
import { IRegister } from "@/types/auth";
import { AuthService } from "@/lib/services/auth.service";

const router = useRouter();
const authStore = useAuthStore();

const validationSchema = toFormValidator(
  object({
    name: string().nonempty("Обязательное поле"),
    email: string()
      .nonempty("Обязательное поле")
      .email({ message: "Некорректная почта" }),
    password: string()
      .nonempty("Обязательное поле")
      .min(5, { message: "Не менее 5 символов" }),
    password_confirmation: string().nonempty("Обязательное поле"),
  }).refine((data) => data.password === data.password_confirmation, {
    message: "Пароли не совпадают",
    path: ["password_confirmation"],
  })
);

const afterSuccessRegister = (data: ITokenResponse) => {
  authStore.setToken(data.plainTextToken);
  router.push({ name: "blog" });
};

const { isLoading, mutate, error, isError } = useMutation(
  (credentials: IRegister) => AuthService.registerUser(credentials), // TODO поправить
  {
    onSuccess: (data: ITokenResponse) => afterSuccessRegister(data),
  }
);

const onSubmit = (values: IRegister) => mutate(values);
</script>

<template>
  <div class="form-signin w-100 m-auto">
    <Form :validation-schema="validationSchema" @submit="onSubmit">
      <h1 class="h3 mb-3 fw-normal">Регистрация</h1>
      <div class="form-floating">
        <Field
          id="floatingName"
          name="name"
          type="text"
          class="form-control"
          placeholder="Иван Иванов"
        />
        <ErrorMessage
          class="error-message text-danger position-absolute"
          name="name"
        />
        <label for="floatingName">Имя</label>
      </div>
      <div class="form-floating">
        <Field
          id="floatingEmail"
          name="email"
          type="email"
          class="form-control"
          placeholder="name@example.com"
        />
        <ErrorMessage
          class="error-message text-danger position-absolute"
          name="email"
        />
        <label for="floatingEmail">Почта</label>
      </div>
      <div class="form-floating">
        <Field
          id="floatingPassword"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
        />
        <ErrorMessage
          class="error-message text-danger position-absolute"
          name="password"
        />
        <label for="floatingPassword">Пароль</label>
      </div>
      <div class="form-floating">
        <Field
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          class="form-control"
          placeholder="Password"
        />
        <ErrorMessage
          class="error-message text-danger position-absolute"
          name="password_confirmation"
        />
        <label for="password_confirmation">Подтвердите пароль</label>
      </div>
      <button
        class="form-button w-100 btn btn-lg btn-success mb-2 position-relative"
        type="submit"
        :disabled="isLoading"
      >
        <LoaderComp v-if="isLoading" />
        <span v-else>Регистрация</span>
      </button>
      <router-link to="/auth"> Вход </router-link>
      <p class="mt-3 mb-3 text-muted">© Maksim Barabanshikov</p>
    </Form>
  </div>
  <MessagePopup v-if="isError" :message="error.message" />
</template>

<script lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  name: "RegisterUser",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
};
</script>

<style>
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-floating {
  margin-bottom: 10px;
  position: relative;
  padding-bottom: 20px;
}

.form-floating .error-message {
  bottom: 0;
  left: 10px;
  font-size: 12px;
}

.form-alert {
  bottom: 90px;
  right: 30px;
}

.form-button {
  height: 46px;
}

.spin {
  transform: translate(-50%, -50%);
  font-size: 16px;
}
</style>
