import React from "react";
import styles from "./CreatePost.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/authContext";

const CreatePost = () => {
  const { isAuth } = useContext(AuthContext);
  // Formik is a small library that helps you with the 3 most annoying parts:
  // 1. Getting values in and out of form state
  // 2. Validation and error messages
  // 3. Handling form submission
  const initialValues = {
    title: "",
    description: "",
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth.status) {
      navigate("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is a required field"),
    description: Yup.string().required("Body is a required field"),
  });

  const onSubmitHandler = async (data) => {
    await axios.post(
      "https://blogly-api-anthony-ngo.herokuapp.com/posts",
      data,
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
    );
    navigate("/");
  };
  return (
    <div className={styles["create-post__container"]}>
      <h2 className={styles["create-post__heading"]}>Create.</h2>
      <p className={styles["create-post__sub-heading"]}>
        Share your thoughts with others!
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={validationSchema}
      >
        <Form className={styles["create-post__form"]}>
          <label
            className={styles["create-post__label"]}
            htmlFor="create-post__input"
          >
            Title
          </label>
          <Field
            className={styles["create-post__field"]}
            id="create-post__field"
            name="title"
            autoComplete="off"
          />
          <ErrorMessage name="title" component="span" />
          <label
            className={styles["create-post__label"]}
            htmlFor="create-post__input"
          >
            Body
          </label>
          <Field
            className={styles["create-post__field"]}
            id="create-post__field"
            name="description"
            autoComplete="off"
            component="textarea"
          />
          <ErrorMessage name="description" component="span" />
          <button className={styles["create-post-btn"]} type="submit">
            Create Post
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
