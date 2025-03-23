export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type Posts = Post[];

export type NewPost = Omit<Post, "id">;
