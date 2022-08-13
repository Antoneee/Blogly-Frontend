import styles from "./RegisterLoginUpdateForm.module.css";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/authContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuth } = useContext(AuthContext);
  const [invalidLogin, setInvalidLogin] = useState(null);

  const navigate = useNavigate();

  const onLoginHandler = async () => {
    const loginCredentials = { username, password };
    try {
      const response = await axios.post(
        "https://blogly-api-anthony-ngo.herokuapp.com/auth/login",
        loginCredentials
      );

      // If we get error from server
      if (response.data.error) {
        throw new Error("Unable to login.");
      } else {
        // After getting access token on login, store in local storage.
        localStorage.setItem("accessToken", response.data.token);
        setIsAuth({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    } catch (err) {
      setInvalidLogin(err.message);
    }
  };
  return (
    <div className={styles["register__container"]}>
      <h1 className={styles["register__header"]}>Login.</h1>
      <p className={styles["register__sub-heading"]}>Welcome!</p>
      <div className={styles["register__form"]}>
        <label
          htmlFor="register__input-password"
          className={styles["register__form-label"]}
        >
          Username
        </label>
        <input
          id="register__input-password"
          name="username"
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
            setInvalidLogin(null);
          }}
          value={username}
          className={styles["register__form-field"]}
        />
        <label
          htmlFor="register__input-username"
          className={styles["register__form-label"]}
        >
          Password
        </label>
        <input
          id="register__input-username"
          name="password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
            setInvalidLogin(null);
          }}
          value={password}
          className={styles["register__form-field"]}
        />
        {invalidLogin && (
          <p className={styles["register__error"]}>
            Wrong username or password. Please try again.
          </p>
        )}
        <button
          className={styles["register__form-btn"]}
          onClick={onLoginHandler}
        >
          Login
        </button>
        <Link to="/register" className={styles["register__login-link"]}>
          Need to register?
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
