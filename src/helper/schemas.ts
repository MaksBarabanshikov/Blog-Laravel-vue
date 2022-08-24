import { object, string } from "zod";
import { toFormValidator } from "@vee-validate/zod";

export const validationLogin = toFormValidator(
  object({
    email: string()
      .nonempty("Обязательное поле")
      .email({ message: "Некорректная почта" }),
    password: string()
      .nonempty("Обязательное поле")
      .min(5, { message: "Не менее 5 символов" }),
  })
);

export const validationRegister = toFormValidator(
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

export const validateSendComment = toFormValidator(
  object({
    text: string()
      .nonempty("Комментарий не должен быть пустым")
      .min(5, { message: "Не менее 5 символов" }),
  })
);
