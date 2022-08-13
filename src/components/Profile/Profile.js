import React, { useEffect, useState, useContext } from "react";
import styles from "./Profile.module.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/authContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ProfilePicture from "../../assets/ProfilePicture";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const userId = useParams().userId;
  useEffect(() => {
    axios
      .get(`https://blogly-api-anthony-ngo.herokuapp.com/profiles/${userId}`)
      .then((response) => setUserInfo(response.data));
    axios
      .get(
        `https://blogly-api-anthony-ngo.herokuapp.com/profiles/${userId}/posts`
      )
      .then((response) => {
        setUserPosts(response.data);
      });
  }, [userId]);

  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);
  return (
    <div className={styles["profile__container"]}>
      <h2 className={styles["profile__heading"]}>Profile.</h2>
      <header className={styles["profile__header"]}>
        <ProfilePicture />
        <div className={styles["profile__header-info"]}>
          <h1 className={styles["profile__header-username"]}>
            {userInfo.username}
          </h1>
          <p className={styles["profile__header-posts"]}>
            {userPosts.length} Posts
          </p>
        </div>
        {isAuth.username === userInfo.username && (
          <Link to={`/profiles/${userInfo.id}/change-password`}>
            <button className={styles["profile__update-btn"]}>
              Update Password
            </button>
          </Link>
        )}
      </header>
      <h3 className={styles["profile__posts-heading"]}>Posts</h3>
      <ul className={styles["profile__posts-list"]}>
        {userPosts.map((userPost) => (
          <li key={userPost.id} className={styles["profile__posts-list-item"]}>
            <h4
              className={styles["profile__post-title"]}
              onClick={() => navigate(`/posts/${userPost.id}`)}
            >
              {userPost.title}
            </h4>
            <p className={styles["profile__post-text"]}>
              {userPost.description}
            </p>
            <div className={styles["profile__post-bottom"]}>
              <p className={styles["profile__post-user"]}>
                {userPost.username}
              </p>
              <p>{userPost.Likes.length}</p>
              {userPost.Likes.map((like) => {
                return like.UserId;
              }).includes(isAuth.id) ? (
                <FavoriteIcon style={{ fill: "#ff4075" }} />
              ) : (
                <FavoriteBorderIcon className="profile__like-btn" />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
