import React from "react";
import styles from "./Posts.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Posts = () => {
  const [postsList, setPostsList] = useState([]);
  const [likedPostsList, setLikedPostsList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      // Get all the posts from DB. Also get all the user's likes to all posts.
      axios
        .get("https://blogly-api-anthony-ngo.herokuapp.com/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          const { likedPosts, postsList } = response.data;
          setPostsList(postsList);

          // Set all user's likes array to contain the all posts that the user liked.
          setLikedPostsList(
            likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const onLikeHandler = (postId) => {
    axios
      .post(
        "https://blogly-api-anthony-ngo.herokuapp.com/likes",
        { postId: postId },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        const userJustLiked = response.data.liked;
        // Update the likes array in posts list.
        setPostsList(
          postsList.map((post) => {
            // If the post the user liked is the current post in array.
            if (post.id === postId) {
              // See if user already liked the post.
              if (userJustLiked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
    // If the all of the posts that the user liked includes the current post, they just liked, remove it.
    if (likedPostsList.includes(postId)) {
      setLikedPostsList(
        likedPostsList.filter((likedPost) => likedPost !== postId)
      );
    } else {
      setLikedPostsList([...likedPostsList, postId]);
    }
  };
  return (
    <div className={styles["posts__container"]}>
      <h1 className={styles["posts__heading"]}>All Posts.</h1>
      <p className={styles["posts__sub-heading"]}>
        Find posts, tutorials, guides, and newsletters from people like you!
      </p>
      <ul className={styles["posts__posts-list"]}>
        {postsList.map((post) => (
          <li className={styles["posts__posts-list-item"]} key={post.id}>
            <h1
              className={styles["posts__post-title"]}
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              {post.title}
            </h1>
            <p className={styles["posts__post-text"]}>{post.description}</p>

            <div className={styles["posts__post-bottom"]}>
              <Link
                className={styles["posts__post-user"]}
                to={`/profiles/${post.UserId}`}
              >
                {post.username}
              </Link>
              <p>{post.Likes.length}</p>
              {likedPostsList.includes(post.id) && (
                <FavoriteIcon
                  style={{ fill: "#ff4075" }}
                  className={styles["posts__like-btn"]}
                  onClick={() => onLikeHandler(post.id)}
                />
              )}
              {!likedPostsList.includes(post.id) && (
                <FavoriteBorderIcon
                  className={styles["posts__like-btn"]}
                  onClick={() => onLikeHandler(post.id)}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
