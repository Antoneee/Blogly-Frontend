import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles["not-found__container"]}>
      <h1 className={styles["not-found__heading"]}>404: Page Not Found</h1>
      <div>
        <Link className={styles["not-found__btn-login"]} to="/login">
          Login
        </Link>
        <Link className={styles["not-found__btn-register"]} to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
