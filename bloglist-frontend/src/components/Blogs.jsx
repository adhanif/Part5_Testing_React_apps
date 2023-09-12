import React, { useState } from "react";
import NewBlog from "../components/NewBlog";

export default function Blogs({
  blogs,
  user,
  setUser,
  setBlogs,
  setErrorMessage,
}) {
  const [visible, setVisible] = useState(false);

  const showForm = { display: visible ? "" : "none" };
  const hiddenButton = { display: visible ? "none" : "" };

  const handleClick = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleVisible = () => {
    setVisible(true);
  };

  const handleHidden = () => {
    setVisible(false);
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
        <button onClick={handleVisible} style={hiddenButton}>
          new note
        </button>

        <div style={showForm}>
          <NewBlog
            user={user}
            blogs={blogs}
            setBlogs={setBlogs}
            setErrorMessage={setErrorMessage}
            setVisible={setVisible}
          />
          <button onClick={handleHidden}>cancel</button>
        </div>
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
