import axios from "@/utils/axios";
import { AxiosResponse } from "axios";
import { IMostCommented } from "@/types/api";

export const PostService = {
  mostCommented: async () => await axios.get(`/api/most-commented`),
  allPosts: async (page: number): Promise<AxiosResponse<IMostCommented[]>> =>
    await axios.get(`/api/blog/posts?page=` + page),
};
