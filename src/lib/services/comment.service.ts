import axios from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "vue-query";
import { useRoute } from "vue-router";
import { Ref } from "vue";

export function useSendCommentMutation() {
  const queryClient = useQueryClient();

  interface sendCommentParams {
    id: string | string[];
    text: string;
  }

  return useMutation(
    async ({ id, text }: sendCommentParams) =>
      axios.post(`/api/posts/comment/${id}`, { text }),
    {
      onSuccess: () => queryClient.invalidateQueries(["comments"])
    }
  );
}

export function useGetCommentsQuery(page: Ref) {
  const route = useRoute();

  const id = route.params.id;

  const name = route.name;

  const currentUrl = (page: Ref) => {
    let url = `/api/posts/comment/${id}?page=` + page.value;

    if (name !== "post") {
      url = `/admin/posts/comment/${id}?page=` + page.value;
    }

    return axios.get(url);
  };

  return useQuery(["comments", id, page], () => currentUrl(page));
}
