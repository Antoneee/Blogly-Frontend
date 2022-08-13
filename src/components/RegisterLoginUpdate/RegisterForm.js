import styles from "./RegisterLoginUpdateForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import React from "react";

const RegisterForm = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3)
      .max(15)
      .required("Username is a required field"),
    password: Yup.string()
      .min(6)
      .max(20)
      .required("Password is a required field"),
  });

  const navigate = useNavigate();

  const onSubmitHandler = async (data) => {
    await axios.post(
      "https://blogly-api-anthony-ngo.herokuapp.com/auth/register",
      data
    );
    navigate("/");
  };
  return (
    <div className={styles["register__container"]}>
      <h1 className={styles["register__header"]}>Create An Account.</h1>
      <p className={styles["register__sub-heading"]}>It's Free!</p>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={validationSchema}
      >
        <Form className={styles["register__form"]}>
          <label
            htmlFor="register__input-username"
            className={styles["register__form-label"]}
          >
            Username
          </label>
          <Field
            id="register__input-username"
            name="username"
            autoComplete="off"
            className={styles["register__form-field"]}
          />
          <ErrorMessage name="username" component="span" />
          <label
            htmlFor="register__input-password"
            className={styles["register__form-label"]}
          >
            Password
          </label>
          <Field
            id="register__input-password"
            name="password"
            autoComplete="off"
            type="password"
            className={styles["register__form-field"]}
          />
          <ErrorMessage name="password" component="span" />
          <button type="submit" className={styles["register__form-btn"]}>
            Register
          </button>
        </Form>
      </Formik>
      <Link to="/login" className={styles["register__login-link"]}>
        Already registered?
      </Link>
    </div>
  );
};

export default RegisterForm;
