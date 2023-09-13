import React, { useState } from "react";
import axiosClient from "../services/axiosClient";

const UserBlog = ({ blog }) => {
  const [show, setShow] = useState(false);
  // const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleClick = (e) => {
    setShow(!show);
  };

  const handleLikes = () => {
    const totalLikes = Number(blog.likes) + 1;
    // setLikes(totalLikes);
    // console.log(totalLikes);
    // console.log(blog);
    axiosClient
      .update(blog.id, { likes: totalLikes })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(blog.id);
  return (
    <div>
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          {"  "}
          <button style={{ paddingLeft: "5px" }} onClick={handleClick}>
            {show ? "hide" : "show"}
          </button>
        </div>
        {show ? (
          <div>
            <p style={{ margin: "0px" }}>{blog.url}</p>
            <div style={{ display: "flex", margin: "0px" }}>
              <p style={{ margin: "0px" }}>likes {blog.likes}</p>
              <button
                style={{ margin: "0px", padding: "0 5px" }}
                onClick={handleLikes}
              >
                like
              </button>
            </div>
            <p style={{ margin: "0px" }}>{blog.user.name}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UserBlog;
