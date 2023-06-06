import React from "react";
import Post from "./Post";

const PostList = ({ posts = [] }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post.post_id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
