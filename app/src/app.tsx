import { ReactElement, useEffect, useState } from "react";
import "./app.scss";
import { fetchPosts } from "./services/fetch-posts";
import { Post, Posts } from "./types/posts-type";
import { createPost } from "./services/create-post";
import { useQueryClient } from "@tanstack/react-query";

export function App(): ReactElement {
  const { data: postsData, error: postsError, isLoading: isPostsLoading } = fetchPosts();
  const { mutate: cretePostMutation } = createPost();

  const queryClient = useQueryClient();

  const [localPosts, setLocalPosts] = useState<Posts>([]);

  useEffect(() => {
    if (postsData) {
      setLocalPosts(postsData);
    }
  }, [postsData]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Posts>([]);

  useEffect(() => {
    inputTitle.length > 0
      ? // ? setFilteredPosts(localPosts.filter((post) => post.title === inputTitle))
        setFilteredPosts(
          localPosts.filter((post) => post.title.toLowerCase().includes(inputTitle.toLowerCase())),
        )
      : setFilteredPosts([]);
  }, [inputTitle, postsData]);

  const userId: number = 999;

  if (postsError && !isPostsLoading) {
    return <>Error while fetching.</>;
  }
  return (
    <>
      <label htmlFor="filterPosts">Filter posts by title: </label>
      <input
        type="text"
        name=""
        id="filterPosts"
        value={inputTitle}
        onChange={(e) => {
          setInputTitle(e.target.value);
        }}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          cretePostMutation(
            { title, body, userId },
            {
              onSuccess: (createdPost) => {
                queryClient.invalidateQueries({ queryKey: ["getPosts"] });
                setLocalPosts((prevPosts) => [createdPost, ...prevPosts]);
              },
            },
          );
          setTitle("");
          setBody("");
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
          value={body}
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
        {inputTitle.length > 0
          ? filteredPosts.map((post) => <div key={post.id}>{post.title}</div>)
          : localPosts.map((post) => <div key={post.id}>{post.title}</div>)}
        {/* {filteredPosts
          ? filteredPosts.map((post) => <div key={post.id}>{post.title}</div>)
          : localPosts &&
            !isPostsLoading &&
            localPosts.map((post: Post) => <div key={post.id}>{post.title}</div>)} */}
      </div>
    </>
  );
}
