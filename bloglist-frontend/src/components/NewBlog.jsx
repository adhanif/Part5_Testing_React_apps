import React from "react";
import { useState } from "react";
import axiosClient from "../services/axiosClient";

export default function NewBlog({ addBlog,setErrorMessage }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    addBlog({ title: title, author: author, url: url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <div>
        <h1>Create New Blog</h1>
        <form onSubmit={handleCreate}>
          <div>
            title
            <input
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            author:
            <input
              id="author"
              type="text"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div>
            url:
            <input
              id="url"
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
