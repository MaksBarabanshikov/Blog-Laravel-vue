import axios from "@/utils/axios";
import { ILogin } from "@/types/auth";

export const AuthService = {
  loginUser: async ({ email, password }: ILogin) =>
    await axios.post("/api/login", { email, password }),
};
