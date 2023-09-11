import React from "react";

export default function Blogs({ blogs, user, setUser }) {
  const handleClick = () => {
    window.localStorage.clear();
    setUser(null);
  };
  return (
    <div>
      {" "}
      <h2>blogs</h2>
      <div style={{ display: "flex" }}>
        <p style={{ margin: "0px" }}>{user.name} is logged in</p>
        <button onClick={handleClick}>logout</button>
      </div>
      {user.blogs.length != 0 ? (
        user.blogs.map((blog) => (
          <div key={blog.id}>
            {blog.title} {blog.author}
          </div>
        ))
      ) : (
        <p>There is no blog</p>
      )}
    </div>
  );
}
