import React from "react";

export default function Blogs({ blogs, user }) {
  return (
    <div>
      {" "}
      <h2>blogs</h2>
      <p>{user.name} is logged in</p>
      {user.blogs.length != 0 ? (
        user.blogs &&
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
