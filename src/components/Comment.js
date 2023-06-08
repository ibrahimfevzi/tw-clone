import React, { useState, useEffect } from "react";
import axios from "axios";
import { token } from "../App";

const Comment = ({ comment, darkMode }) => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showActions, setShowActions] = useState(false); // State to control the visibility of actions
  const [likeCount, setLikeCount] = useState(comment.likes_count);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/users/${comment.user_id}`,
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
  }, [comment.user_id]);

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

  const handleToggleActions = () => {
    setShowActions(!showActions);
  };

  const handleDeleteComment = async () => {
    try {
      // Send a request to delete the comment
      await axios.delete(
        `http://localhost:9000/api/comments/${comment.comment_id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = async () => {
    // Implement the logic to edit the comment
    try {
      const newContent = prompt("Yorumu Güncelle", comment.content);
      if (newContent) {
        await axios.put(
          `http://localhost:9000/api/comments/${comment.comment_id}`,
          {
            content: newContent,
            post_id: comment.post_id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      if (!liked) {
        await axios.post(
          "http://localhost:9000/api/likes",
          {
            comment: comment.comment_id,
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
        await axios.delete(
          `http://localhost:9000/api/likes/comments/${comment.comment_id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
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
            <i>@{username}</i> &middot; {formatCreatedAt(comment.created_at)}
            <div className="flex items-center mb-2">
              <p className="text-lg mb-2">{comment.content}</p>
            </div>
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
                onClick={handleEditComment}
              >
                Düzenle
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-black"
                onClick={handleDeleteComment}
              >
                Sil
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center mb-2">
        <button className="action-icon ml-14 mr-20" aria-label="Comment">
          <i className="fas fa-comment"></i>
        </button>
        <button className="action-icon mr-20" aria-label="Retweet">
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
        <button className="action-icon" aria-label="Share">
          <i className="fas fa-share"></i>
        </button>
      </div>
    </div>
  );
};

export default Comment;
