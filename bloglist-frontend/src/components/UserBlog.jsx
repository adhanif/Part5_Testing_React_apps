import React, { useState } from "react";

const UserBlog = ({ blog }) => {
  const [show, setShow] = useState(false);

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
              <button style={{ margin: "0px", padding: "0 5px" }}>like</button>
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
