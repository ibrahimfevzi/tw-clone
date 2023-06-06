import React, { useState } from "react";
import Comment from "./Comment";

const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  // Tarihi düzenleme fonksiyonu
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <div className="post p-4 border border-gray-300 rounded mb-4">
      <h3 className="text-lg font-bold mb-2">{post.content}</h3>
      <p className="text-sm text-gray-600 mb-1">
        Posted by User ID: {post.user_id}
      </p>
      <p className="text-xs text-gray-400 mb-4">
        {formatCreatedAt(post.created_at)}
      </p>
      <div className="flex items-center mb-2">
        <button
          className="action-icon mr-20"
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
        <div className="comments">
          <h4 className="text-md font-semibold mb-2">Comments:</h4>
          {post.comments.map((comment) => (
            <Comment key={comment.comment_id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
