import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import axios from "axios";
import { token } from "../App";

const Post = ({ post, darkMode }) => {
  const [showComments, setShowComments] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showActions, setShowActions] = useState(false); // State to control the visibility of actions
  const [likeCount, setLikeCount] = useState(post.likes_count);
  const [liked, setLiked] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/likes/${post.post_id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setLiked(response.data.liked);
        const likeCount = response.data.length;
        setLikeCount(likeCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLikeStatus();
  }, [post.post_id]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/users/${post.user_id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const userData = response.data;
        setUsername(userData.username);
        setAvatar(userData.avatar);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsername();
  }, [post.user_id]);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return date.toLocaleString("en-GB", options);
  };

  const handleCommentInputChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleSubmitComment = async () => {
    try {
      await axios.post(
        "http://localhost:9000/api/comments",
        {
          post_id: post.post_id,
          content: commentContent,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCommentContent("");
      setShowCommentInput(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleToggleActions = () => {
    setShowActions(!showActions);
  };

  const handleDeletePost = async () => {
    try {
      // Send a request to delete the post
      await axios.delete(`http://localhost:9000/api/posts/${post.post_id}`, {
        headers: {
          Authorization: token,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = () => {
    // Implement the logic to edit the post
  };

  const handleLike = async () => {
    try {
      if (!liked) {
        await axios.post(
          "http://localhost:9000/api/likes",
          {
            post_id: post.post_id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setLikeCount((prevCount) => prevCount + 1);
        setLiked(true);
      } else {
        await axios.delete(`http://localhost:9000/api/likes/${post.post_id}`, {
          headers: {
            Authorization: token,
          },
        });
        setLikeCount((prevCount) => prevCount - 1);
        setLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`post p-4 border border-gray-300 rounded mb-4 ${
        darkMode ? "text-white" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {avatar && (
            <img
              src={avatar}
              alt="Avatar"
              className="w-12 h-12 rounded-full mr-2"
            />
          )}
          <p
            className={`text-sm text-gray-600 mb-0 ${
              darkMode ? "text-white" : ""
            }`}
          >
            <i>@{username}</i> &middot; {formatCreatedAt(post.created_at)}
            <h3 className={`text-lg mb-2 ${darkMode ? "text-white" : ""}`}>
              {post.content}
            </h3>
          </p>
        </div>
        {/* Actions */}
        <div className="relative">
          <button
            className={`action-icon ${darkMode ? "text-white" : ""}`}
            aria-label="Toggle Actions"
            onClick={handleToggleActions}
          >
            <i className="fas fa-ellipsis-h"></i>
          </button>
          {/* Actions dropdown */}
          {showActions && (
            <div
              className={`absolute right-0 mt-2 py-2 w-40 border rounded shadow ${
                darkMode ? "bg-gray-700 text-white" : "bg-white"
              }`}
            >
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-black"
                onClick={handleEditPost}
              >
                Düzenle
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-black"
                onClick={handleDeletePost}
              >
                Sil
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center mb-2">
        <button
          className={`action-icon ml-14 mr-20 ${darkMode ? "text-white" : ""}`}
          aria-label="Comment"
          onClick={toggleComments}
        >
          <i className="fas fa-comment"></i>
          <span className="ml-1 text-xs">{post.comments.length}</span>
        </button>
        <button
          className={`action-icon mr-20 ${darkMode ? "text-white" : ""}`}
          aria-label="Retweet"
        >
          <i className="fas fa-retweet"></i>
        </button>
        <button
          className={`action-icon mr-20 ${
            liked ? "text-red-500" : darkMode ? "text-white" : ""
          }`}
          aria-label="Like"
          onClick={handleLike}
        >
          <i className="fas fa-heart"></i>
          <span className="ml-1 text-xs">{likeCount}</span>
        </button>

        <button
          className={`action-icon ${darkMode ? "text-white" : ""}`}
          aria-label="Share"
        >
          <i className="fas fa-share"></i>
        </button>
      </div>
      {showComments && (
        <div className="comments ml-8">
          <div className="flex items-center mb-2">
            <h4
              className={`text-md font-semibold mr-2 ${
                darkMode ? "text-white" : ""
              }`}
            >
              Yorumlar:
            </h4>
            {!showCommentInput ? (
              <button
                className={`twit-button bg-blue-400 rounded-full p-2 sm:p-1 sm:px-3 ${
                  darkMode ? "text-white" : ""
                }`}
                onClick={handleToggleCommentInput}
              >
                <i className="fas fa-pencil-alt text-white"></i>
                <span
                  className={`mm-1 font-twitter ${
                    darkMode ? "text-white" : "text-white"
                  } ml-2`}
                >
                  Yorum Yap
                </span>
              </button>
            ) : (
              <div className="comment-input-container">
                <input
                  type="text"
                  placeholder="Yorum yap..."
                  value={commentContent}
                  onChange={handleCommentInputChange}
                />
                <button
                  className="comment-input-icon"
                  onClick={handleToggleCommentInput}
                >
                  <i className="fas fa-times"></i>
                </button>
                <button
                  className={`twit-button bg-blue-400 rounded-full p-2 sm:p-1 sm:px-3 ${
                    darkMode ? "text-white" : ""
                  }`}
                  onClick={handleSubmitComment}
                >
                  <i className="fas fa-paper-plane text-white"></i>
                  <span
                    className={`mm-1 font-twitter ${
                      darkMode ? "text-white" : ""
                    }`}
                  >
                    Gönder
                  </span>
                </button>
              </div>
            )}
          </div>
          {post.comments.map((comment) => (
            <Comment
              key={comment.comment_id}
              comment={comment}
              darkMode={darkMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
