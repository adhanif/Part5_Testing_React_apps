import React from "react";
import { useState } from "react";
import axiosClient from "../services/axiosClient";

export default function NewBlog({ user, setBlogs, blogs, setErrorMessage }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        const blog = {
          title: title,
          author: author,
          url: url,
        };
        await axiosClient.create(blog);
        setErrorMessage(`${title}! by ${author} added`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        setTitle("");
        setAuthor("");
        setUrl("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
  );
}
