import { useState, useEffect } from "react";
import "./App.css";
import axiosClient from "./services/axiosClient";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(username, password);
    try {
      const user = await axiosClient.login({
        username,
        password,
      });
      // console.log(user);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axiosClient.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <div className="container">
          <Blogs blogs={blogs} user={user} />
        </div>
      )}
    </>
  );
}

export default App;
