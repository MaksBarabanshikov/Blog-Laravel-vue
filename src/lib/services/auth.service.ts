import axios from "@/utils/axios";
import { ILogin, IRegister } from "@/types/auth";
import { useMutation } from "vue-query";
import { ITokenResponse } from "@/types/api";
import {
  afterSuccessAdminLogin,
  afterSuccessAuth,
  afterSuccessLogout,
} from "@/helper/helper";
import { useQuery } from "vue-query";

export function useGetNameQuery() {
  return useQuery("name", () => axios.get("/api/user"));
}

export function useRegisterUserMutation() {
  return useMutation(
    async (credentials: IRegister) => await axios.post("/api/register", credentials),
    {
      onSuccess: (data: ITokenResponse) => afterSuccessAuth(data),
    }
  );
}

export function useLoginUserMutation() {
  return useMutation(
    async (credentials: ILogin) => await axios.post("/api/login", credentials),
    {
      onSuccess: (data: ITokenResponse) => afterSuccessAuth(data),
    }
  );
}

export function useLogoutUserMutation() {
  return useMutation(async () => await axios.post("/api/logout"), {
    onSuccess: () => afterSuccessLogout(),
  });
}

export function useLoginAdminMutation() {
  return useMutation(
      async (credentials: ILogin) => await axios.post("/admin/login", credentials),
      {
        onSuccess: ({ token }: { token: ITokenResponse }) => afterSuccessAdminLogin(token),
        onError: (error) => console.log(error),
      }
  );
}
