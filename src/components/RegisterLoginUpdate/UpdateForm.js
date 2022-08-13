import styles from "./RegisterLoginUpdateForm.module.css";
import React from "react";
import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const UpdateForm = () => {
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const { setIsAuth } = useContext(AuthContext);
  const [invalidPassword, setInvalidPassword] = useState(null);

  const navigate = useNavigate();
  const onPasswordChangeHandler = () => {
    axios
      .put(
        "https://blogly-api-anthony-ngo.herokuapp.com/auth/change-password",
        {
          oldPassword: oldPasswordInput,
          newPassword: newPasswordInput,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) {
          setInvalidPassword(response.data.error);
          return;
        } else {
          localStorage.removeItem("accessToken");
          setIsAuth({ username: "", id: 0, status: false });
          navigate("/login");
        }
      });
  };
  return (
    <div className={styles["register__container"]}>
      <h1 className={styles["register__header"]}>Update.</h1>
      <p className={styles["register__sub-heading"]}>Need a new password?</p>
      <div className={styles["register__form"]}>
        <label className={styles["register__form-label"]}>Old Password</label>
        <input
          type="password"
          className={styles["register__form-field"]}
          onChange={(event) => {
            setOldPasswordInput(event.target.value);
            setInvalidPassword(null);
          }}
        />
        <label className={styles["register__form-label"]}>New Password</label>

        <input
          type="password"
          className={styles["register__form-field"]}
          onChange={(event) => {
            setNewPasswordInput(event.target.value);
            setInvalidPassword(null);
          }}
        />
        {invalidPassword && (
          <p className={styles["register__error"]}>
            The pasword entered is incorrect. Please try again.
          </p>
        )}
        <button
          className={styles["register__form-btn"]}
          onClick={onPasswordChangeHandler}
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default UpdateForm;
