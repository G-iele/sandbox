import { ReactElement, useEffect, useState } from "react";
import "./app.scss";
import { fetchPosts } from "./services/fetch-posts";
import { Post } from "./types/posts-type";
import { createPost } from "./services/create-post";

export function App(): ReactElement {
  const { data: postsData, error: postsError, isLoading: isPostsLoading } = fetchPosts();

  const { mutate: cretePostMutation, data: newPosts } = createPost();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const userId: number = 999;

  if (postsError && !isPostsLoading) {
    return <>Error while fetching.</>;
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          cretePostMutation({ title, body, userId });
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          width: "30%",
          color: "lightgray",
          paddingBottom: 50,
        }}
      >
        <label htmlFor="title">Post title:</label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <label htmlFor="body">Post body:</label>
        <input
          id="body"
          name="body"
          type="text"
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />

        <button type="submit">Submit</button>
      </form>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          color: "lightgray",
        }}
      >
        {postsData &&
          !isPostsLoading &&
          postsData.map((post: Post) => <div key={post.id}>{post.title}</div>)}
      </div>
    </>
  );
}
