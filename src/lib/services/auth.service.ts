import axios from "@/utils/axios";
import { ILogin, IRegister } from "@/types/auth";

export const AuthService = {
  loginUser: async ({ email, password }: ILogin) => {
    return await axios.post("/api/login", { email, password });
  },
  logoutUser: async () => {
    return await axios.post("/api/logout");
  },
  registerUser: async ({
    name,
    email,
    password,
    password_confirmation,
  }: IRegister) => {
    return await axios.post("/api/register", {
      name,
      email,
      password,
      password_confirmation,
    });
  },
  getName: async () => {
    return await axios.get("/api/user");
  },
};
