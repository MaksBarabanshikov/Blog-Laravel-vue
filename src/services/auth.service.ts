import axios from "@/utils/axios";
import { useMutation } from "vue-query";
import { ITokenResponse } from "@/types/api";
import {
    afterSuccessAdminLogin, afterSuccessAdminLogout,
    afterSuccessAuth,
    afterSuccessLogout,
} from "@/helper/helper";
import { useQuery } from "vue-query";

export function useGetNameQuery() {
  return useQuery("name", () => axios.get("/api/user"));
}

export function useRegisterUserMutation() {
  return useMutation(
    async (credentials) => await axios.post("/api/register", credentials),
    {
      onSuccess: (data: ITokenResponse) => afterSuccessAuth(data),
    }
  );
}

export function useLoginUserMutation() {
  return useMutation(
    async (credentials) => await axios.post("/api/login", credentials),
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
      async (credentials) => await axios.post("/admin/login", credentials),
      {
        onSuccess: ({ token }: { token: ITokenResponse }) => afterSuccessAdminLogin(token),
        onError: (error) => console.log(error),
      }
  );
}

export function useLogoutAdminMutation() {
    return useMutation(
        async () => await axios.post("/admin/logout"), {
            onSuccess: () => afterSuccessAdminLogout()
        }
    )
}
