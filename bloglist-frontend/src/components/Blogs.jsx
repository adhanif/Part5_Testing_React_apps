import React from "react";
import NewBlog from "../components/NewBlog";

export default function Blogs({ blogs, user, setUser, setBlogs }) {
  const handleClick = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const userBlogs = blogs.filter((blog) => blog.user.id === user.id);

  return (
    <div>
      {" "}
      <h2>blogs</h2>
      <div style={{ display: "flex" }}>
        <p style={{ margin: "0px" }}>{user.name} is logged in</p>
        <button onClick={handleClick}>logout</button>
      </div>
      <div style={{ marginTop: "30px" }}>
        <NewBlog user={user} blogs={blogs} setBlogs={setBlogs} />
      </div>
      <div style={{ marginTop: "10px" }}>
        {userBlogs.length != 0 ? (
          userBlogs.map((blog) => (
            <div key={blog.id}>
              {blog.title} {blog.author}
            </div>
          ))
        ) : (
          <p>There is no blog</p>
        )}
      </div>
    </div>
  );
}
