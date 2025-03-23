import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Posts } from "../types/posts-type";
import { baseUrl } from "../constants/base-url";

export const fetchPosts = (): UseQueryResult<Posts, Error> => {
  return useQuery<Posts>({
    queryKey: ["getPosts"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/posts`);
      return res.json();
    },
  });
};
