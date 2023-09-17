import React, { useRef } from "react";
import NewBlog from "../components/NewBlog";
import Togglable from "./Togglable";
import UserBlog from "./UserBlog";
import axiosClient from "../services/axiosClient";

export default function Blogs({
  blogs,
  user,
  setUser,
  setBlogs,
  setErrorMessage,
}) {
  const blogFormRef = useRef();

  const handleClick = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const userBlogs = blogs
    .filter((blog) => blog.user.id === user.id)
    .sort((a, b) => b.likes - a.likes);

  const addBlog = (newBlogObj) => {
    if (user) {
      blogFormRef.current.handleVisiblity();
      axiosClient
        .create(newBlogObj)
        .then((data) => {
          setBlogs([...blogs, data]);

          setErrorMessage(`${newBlogObj.title}! by ${newBlogObj.author} added`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const addLike = (id, likeObj) => {
    axiosClient
      .update(id, likeObj)
      .then((returnedBlog) => {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.id === id ? { ...blog, likes: returnedBlog.likes } : blog
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {" "}
      <h2>blogs</h2>
      <div style={{ display: "flex" }}>
        <p style={{ margin: "0px" }} className="userName">
          {user.name} is logged in
        </p>
        <button onClick={handleClick}>logout</button>
      </div>
      <div style={{ marginTop: "30px" }}>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <NewBlog
            user={user}
            blogs={blogs}
            setBlogs={setBlogs}
            setErrorMessage={setErrorMessage}
            blogFormRef={blogFormRef}
            addBlog={addBlog}
          />
        </Togglable>
      </div>
      <div style={{ marginTop: "10px" }}>
        {userBlogs.length !== 0 ? (
          userBlogs.map((blog) => (
            <div key={blog.id}>
              <UserBlog blog={blog} setBlogs={setBlogs} addLike={addLike} />
            </div>
          ))
        ) : (
          <p>There is no blog</p>
        )}
      </div>
    </div>
  );
}
