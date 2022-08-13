import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import AuthContext from "./context/authContext";
import { useState, useEffect } from "react";
import axios from "axios";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import PasswordUpdate from "./pages/PasswordUpdatePage";
import Navigation from "./components/Navigation/Navigation";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailsPage from "./pages/PostDetailsPage";

function App() {
  // Authentication app-wide state.
  const [isAuth, setIsAuth] = useState({ username: "", id: 0, status: false });

  // Check if user is authenticated to set the authentication state.
  useEffect(() => {
    axios
      .get("https://blogly-api-anthony-ngo.herokuapp.com/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setIsAuth({ username: "", id: 0, status: false });
        } else {
          setIsAuth({
            username: response.data.username,
            id: response.data.userId,
            status: true,
          });
        }
      });
  }, [isAuth]);

  return (
    <div className="App">
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <Navigation />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/add-post" exact element={<CreatePostPage />} />
          <Route path="/posts/:postId" exact element={<PostDetailsPage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/profiles/:userId" exact element={<ProfilePage />} />
          <Route
            path="/profiles/:userId/change-password"
            exact
            element={<PasswordUpdate />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
