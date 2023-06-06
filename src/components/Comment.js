import React from "react";

const Comment = ({ comment }) => {
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
    <div className="comment p-2 border border-gray-300 rounded mb-2">
      <p className="text-sm mb-1">{comment.content}</p>
      <p className="text-xs text-gray-600 mb-1">
        Commented by User ID: {comment.user_id}
      </p>
      <p className="text-xs text-gray-400 mb-1">
        {formatCreatedAt(comment.created_at)}
      </p>
      <div className="flex items-center mb-2">
        <button className="action-icon mr-20" aria-label="Comment">
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
