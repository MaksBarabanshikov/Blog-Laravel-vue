import axios from "@/utils/axios";
import { AxiosResponse } from "axios";
import { IMostCommented } from "@/types/api";
import { useQuery } from "vue-query";
import { useMutation } from "vue-query/esm";

export function useMostCommentedQuery() {
  return useQuery<Promise<AxiosResponse<IMostCommented[]>>>(
    "most-commented",
    async () => await axios.get(`/api/most-commented`)
  );
}

export function useGetCurrentPostQuery(id: string | string[]) {
  return useQuery(
    "current-post",
    async () => await axios.get(`/api/blog/posts/${id}`)
  );
}

export function useGetPostsMutation() {
  return useMutation(
    async (page: number) => await axios.get(`/api/blog/posts?page=` + page)
  );
}
