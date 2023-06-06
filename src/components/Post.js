import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import axios from "axios";
import { token } from "../App";

const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(""); // New state for the avatar
  const [commentContent, setCommentContent] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

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
        setAvatar(userData.avatar); // Set the avatar state
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
      // Assuming that you have a function to update the comments array in the parent component,
      // you can pass it as a prop and call it here to update the comments.
      // updateComments(newComment);
      setCommentContent("");
      setShowCommentInput(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
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
          <i>@{username}</i> &middot; {formatCreatedAt(post.created_at)}
          <h3 className="text-lg mb-2">{post.content}</h3>
        </p>
      </div>

      <div className="flex items-center mb-2">
        <button
          className="action-icon ml-14 mr-20"
          aria-label="Comment"
          onClick={toggleComments}
        >
          <i className="fas fa-comment"></i>
          <span className="ml-1 text-xs">{post.comments.length}</span>
        </button>
        <button className="action-icon mr-20" aria-label="Retweet">
          <i className="fas fa-retweet"></i>
        </button>
        <button className="action-icon mr-20" aria-label="Like">
          <i className="fas fa-heart"></i>
          <span className="ml-1 text-xs">{post.likes_count}</span>
        </button>
        <button className="action-icon" aria-label="Share">
          <i className="fas fa-share"></i>
        </button>
      </div>
      {showComments && (
        <div className="comments ml-8">
          <div className="flex items-center mb-2">
            <h4 className="text-md font-semibold mr-2">Yorumlar:</h4>
            {!showCommentInput ? (
              <button
                className="twit-button bg-blue-400 rounded-full p-2 sm:p-1 sm:px-3"
                onClick={handleToggleCommentInput}
              >
                <i className="fas fa-pencil-alt text-white"></i>
                <span className="mm-1 font-twitter text-white ml-2">
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
                  className="twit-button bg-blue-400 rounded-full p-2 sm:p-1 sm:px-3"
                  onClick={handleSubmitComment}
                >
                  <i className="fas fa-paper-plane text-white"></i>
                  <span className="mm-1 font-twitter text-white">Gönder</span>
                </button>
              </div>
            )}
          </div>
          {post.comments.map((comment) => (
            <Comment key={comment.comment_id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
