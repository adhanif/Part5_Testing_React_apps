import React from "react";
import { useState } from "react";
import axiosClient from "../services/axiosClient";

export default function NewBlog({
  user,
  setErrorMessage,
  blogFormRef,
  blogs,
  setBlogs,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();

    if (user) {
      const blog = {
        title: title,
        author: author,
        url: url,
      };
      axiosClient
        .create(blog)
        .then((data) => {
          setBlogs([...blogs, data]);
          blogFormRef.current.handleVisiblity();
          setErrorMessage(`${title}! by ${author} added`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
          setTitle("");
          setAuthor("");
          setUrl("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div>
        <h1>Create New Blog</h1>
        <form onSubmit={handleCreate}>
          <div>
            title
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div>
            url:
            <input
              type="text"
              name="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </>
  );
}
