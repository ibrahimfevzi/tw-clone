import React from "react";
import Post from "./Post";

const PostList = ({ posts, darkMode }) => {
  const reversedPosts = [...posts].reverse(); // Reverse the posts array

  return (
    <div>
      {reversedPosts.map((post) => (
        <Post key={post.post_id} post={post} darkMode={darkMode} />
      ))}
    </div>
  );
};

export default PostList;
