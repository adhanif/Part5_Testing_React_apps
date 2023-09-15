import React, { useState } from "react";
import axiosClient from "../services/axiosClient";

const UserBlog = ({ blog, setBlogs, addLike }) => {
  const [show, setShow] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const removeButton = {
    backgroundColor: "#3a7ef4",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const handleClick = (e) => {
    setShow(!show);
  };

  const handleLikes = () => {
    const totalLikes = Number(blog.likes) + 1;
    addLike(blog.id, { likes: totalLikes });
  };

  const handleRemoveBlog = () => {
    const confirmedDelete = window.confirm(
      `Remove blog ${blog.title}! by ${blog.author}`
    );

    if (confirmedDelete) {
      axiosClient
        .remove(blog.id)
        .then((returnedData) => {
          setBlogs(returnedData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <div style={blogStyle}>
        <div className="blog">
          {blog.title} {blog.author}
          {"  "}
          <button
            style={{ paddingLeft: "5px" }}
            onClick={handleClick}
            className="showDetail"
          >
            {show ? "hide" : "show"}
          </button>
        </div>
        {show && (
          <div className="blog-details">
            <p style={{ margin: "0px" }}>{blog.url}</p>
            <div style={{ display: "flex", margin: "0px" }}>
              <p style={{ margin: "0px" }} id="likesCheck">
                likes {blog.likes}
              </p>
              <button
                style={{ margin: "0px", padding: "0 5px" }}
                onClick={handleLikes}
                className="likeButton"
              >
                like
              </button>
            </div>
            <p style={{ margin: "0px" }}>{blog.user?.name}</p>
            <button style={removeButton} onClick={handleRemoveBlog}>
              remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBlog;
