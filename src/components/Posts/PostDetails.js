import React, { useContext, useState, useEffect } from "react";
import styles from "./PostDetails.module.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import ProfilePicture from "../../assets/ProfilePicture";

const PostDetails = () => {
  const [post, setPost] = useState({});
  const postId = useParams().postId;
  const [commentInput, setCommentInput] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  // Authorize delete option for users own comments.
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`https://blogly-api-anthony-ngo.herokuapp.com/posts/${postId}`)
      .then((response) => setPost(response.data));
    axios
      .get(`https://blogly-api-anthony-ngo.herokuapp.com/comments/${postId}`)
      .then((response) => setCommentsList(response.data));
  }, [postId]);

  const onCommentChangeHandler = (event) => {
    setCommentInput(event.target.value);
  };

  const addCommentHandler = () => {
    const commentToBeAdded = {
      commentBody: commentInput,
      PostId: postId,
    };
    axios
      .post("https://blogly-api-anthony-ngo.herokuapp.com/comments", commentToBeAdded, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        // Add username property to update state.
        commentToBeAdded.id = response.data.id;
        commentToBeAdded.username = response.data.username;
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setCommentsList([...commentsList, commentToBeAdded]);
        }
      });
    setCommentInput("");
  };

  const onDeleteCommentHandler = (id) => {
    axios
      .delete(`https://blogly-api-anthony-ngo.herokuapp.com/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) =>
        setCommentsList(commentsList.filter((comment) => comment.id !== id))
      );
  };

  const navigate = useNavigate();

  const onDeletePostHandler = (postId) => {
    axios
      .delete(`https://blogly-api-anthony-ngo.herokuapp.com/posts/${postId}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => navigate("/"));
  };

  const onEditPostHandler = (option) => {
    if (isAuth.username !== post.username) return;
    if (option === "title") {
      let updatedTitle = prompt("Enter a new title:");
      axios.put(
        `https://blogly-api-anthony-ngo.herokuapp.com/posts/${post.id}/title`,
        { title: updatedTitle },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      );
      setPost({ ...post, title: updatedTitle });
    } else if (option === "description") {
      let updatedDescription = prompt("Enter a new decsription:");
      axios.put(
        `https://blogly-api-anthony-ngo.herokuapp.com/posts/${post.id}/description`,
        { title: updatedDescription },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      );
      setPost({ ...post, description: updatedDescription });
    }
  };

  return (
    <div className={styles["post__container"]}>
      <div className={styles["post__post-content"]}>
        <div className={styles["post__post-content-top"]}>
          <h1
            className={styles["post__post-content-title"]}
            onClick={() => onEditPostHandler("title")}
          >
            {post.title}
          </h1>
          {isAuth.username === post.username && (
            <>
              <button
                className={styles["post__post-delete-btn"]}
                onClick={() => onDeletePostHandler(post.id)}
              >
                Delete
              </button>
            </>
          )}
          {isAuth.username === post.username && (
            <>
              <button
                className={styles["post__post-edit-btn"]}
                onClick={() => onEditPostHandler("description")}
              >
                Edit
              </button>
            </>
          )}
        </div>
        <p className={styles["post__post-user"]}>{post.username}</p>
        <div className={styles["post__post-body-container"]}>
          <p className={styles["post__post-body"]}>{post.description}</p>
        </div>
      </div>
      <div className={styles["post__add-comment"]}>
        <input
          className={styles["post__add-comment-field"]}
          type="text"
          placeholder="Add a comment..."
          autoComplete="off"
          onChange={onCommentChangeHandler}
          value={commentInput}
        />
        <button
          className={styles["post__add-comment-btn"]}
          onClick={addCommentHandler}
        >
          Comment
        </button>
      </div>
      <div className={styles["post__comments"]}>
        <h2 className={styles["post__comments-heading"]}>Comments</h2>
        <ul className={styles["post__comments-list"]}>
          {commentsList.map((comment) => (
            <li
              className={styles["post__comments-list-item"]}
              key={`${comment.id}`}
            >
              <ProfilePicture className="profile__picture-comment" />
              <div className={styles["post__comment-content"]}>
                <h3 className={styles["post__comment-user"]}>
                  {comment.username}
                </h3>
                <p className={styles["post__comment-body"]}>
                  {comment.commentBody}
                </p>
              </div>

              {isAuth.username === comment.username && (
                <button
                  className={styles["post__comments-delete-btn"]}
                  onClick={() => onDeleteCommentHandler(comment.id)}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostDetails;
