import axios from "@/utils/axios";

export const PostService = {
  getPosts: async () => await axios.get("https://pokeapi.co/api/v2/pokemon"),
};
