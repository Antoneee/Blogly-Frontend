import React from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import styles from "./Navigation.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navigation = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [mobileMenu, setMobileMenu] = useState(true);
  const [mobileMenuClick, setMobileMenuClick] = useState(false);

  const navigate = useNavigate();

  const onLogoutHandler = () => {
    setMobileMenuClick(false);
    localStorage.removeItem("accessToken");
    setIsAuth({ username: "", id: 0, status: false });
    navigate("/login");
  };

  const showMobileMenuIcon = () => {
    if (window.innerWidth <= 1024) {
      setMobileMenu(true);
    } else {
      closeMobileMenuClickHandler();
      setMobileMenu(false);
    }
  };

  const mobileMenuClickHandler = () => {
    setMobileMenuClick(!mobileMenuClick);
  };

  const closeMobileMenuClickHandler = () => {
    setMobileMenuClick(false);
  };

  window.addEventListener("resize", showMobileMenuIcon);

  return (
    <>
      {mobileMenuClick ? (
        <div className={styles["mobile-menu"]}>
          <nav className={styles["nav-links"]}>
            {!isAuth.status ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles["nav-link"]} ${styles["active"]}`
                      : styles["nav-link"]
                  }
                  onClick={() => setMobileMenuClick(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles["nav-link"]} ${styles["active"]}`
                      : styles["nav-link"]
                  }
                  onClick={() => setMobileMenuClick(false)}
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles["nav-link"]} ${styles["active"]}`
                      : styles["nav-link"]
                  }
                  onClick={() => setMobileMenuClick(false)}
                >
                  Posts
                </NavLink>
                <NavLink
                  to="/add-post"
                  className={({ isActive }) =>
                    isActive
                      ? `${styles["nav-link"]} ${styles["active"]}`
                      : styles["nav-link"]
                  }
                  onClick={() => setMobileMenuClick(false)}
                >
                  Create A Post
                </NavLink>
                <NavLink
                  to={`/profiles/${isAuth.id}`}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles["nav-link"]} ${styles["active"]}`
                      : styles["nav-link"]
                  }
                  onClick={() => setMobileMenuClick(false)}
                >
                  Profile
                </NavLink>
                <button
                  onClick={onLogoutHandler}
                  className={styles["btn-logout"]}
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      ) : (
        ""
      )}
      <header className={styles["nav-container"]}>
        <NavLink to="/" className={styles["nav-logo"]}>
          <h1>Blogly.</h1>
        </NavLink>

        {mobileMenu &&
          (!mobileMenuClick ? (
            <MenuIcon
              onClick={mobileMenuClickHandler}
              style={{
                width: "40px",
                height: "80px",
                marginLeft: "auto",
                cursor: "pointer",
              }}
            />
          ) : (
            <CloseIcon
              onClick={mobileMenuClickHandler}
              style={{
                width: "40px",
                height: "80px",
                marginLeft: "auto",
                cursor: "pointer",
              }}
            />
          ))}
        {!mobileMenu && (
          <>
            <nav className={styles["nav-links"]}>
              {!isAuth.status ? (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? `${styles["nav-link"]} ${styles["active"]}`
                        : styles["nav-link"]
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? `${styles["nav-link"]} ${styles["active"]}`
                        : styles["nav-link"]
                    }
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? `${styles["nav-link"]} ${styles["active"]}`
                        : styles["nav-link"]
                    }
                  >
                    Posts
                  </NavLink>
                  <NavLink
                    to="/add-post"
                    className={({ isActive }) =>
                      isActive
                        ? `${styles["nav-link"]} ${styles["active"]}`
                        : styles["nav-link"]
                    }
                  >
                    Create A Post
                  </NavLink>
                  <NavLink
                    to={`/profiles/${isAuth.id}`}
                    className={({ isActive }) =>
                      isActive
                        ? `${styles["nav-link"]} ${styles["active"]}`
                        : styles["nav-link"]
                    }
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={onLogoutHandler}
                    className={styles["btn-logout"]}
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
          </>
        )}
      </header>
    </>
  );
};

export default Navigation;
