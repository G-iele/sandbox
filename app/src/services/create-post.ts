import { useMutation } from "@tanstack/react-query";
import { NewPost, Post } from "../types/posts-type";
import { baseUrl } from "../constants/base-url";

export const createPost = () => {
  return useMutation<Post, Error, NewPost>({
    mutationFn: async (post: NewPost) => {
      const res = await fetch(`${baseUrl}/posts`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      return res.json();
    },
  });
};
