import React, { useState, useEffect } from "react";
import axios from "axios";
import { token } from "../App";

const Comment = ({ comment }) => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(""); // New state for the avatar

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
        console.log(response);
        const userData = response.data;
        setUsername(userData.username);
        setAvatar(userData.avatar); // Set the avatar state
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

  return (
    <div className="post p-4 border border-gray-300 rounded mb-4">
      <div className="flex items-center mb-2">
        {avatar && (
          <img
            src={avatar}
            alt="Avatar"
            className="w-12 h-12 rounded-full mr-2"
          />
        )}
        <p className="text-sm text-gray-600 mb-0">
          <i>@{username}</i> &middot; {formatCreatedAt(comment.created_at)}
          <p className="text-lg mb-2">{comment.content}</p>
        </p>
      </div>
      <div className="flex items-center mb-2">
        <button className="action-icon ml-14 mr-20" aria-label="Comment">
          <i className="fas fa-comment"></i>
        </button>
        <button className="action-icon mr-20" aria-label="Retweet">
          <i className="fas fa-retweet"></i>
        </button>
        <button className="action-icon mr-20" aria-label="Like">
          <i className="fas fa-heart"></i>
          <span className="ml-1 text-xs">{comment.likes_count}</span>
        </button>
        <button className="action-icon" aria-label="Share">
          <i className="fas fa-share"></i>
        </button>
      </div>
    </div>
  );
};

export default Comment;
