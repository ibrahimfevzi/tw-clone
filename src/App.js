import React from "react";
import PostList from "./components/PostList";
import axios from "axios";
import { useEffect, useState } from "react";
import { ReactComponent as TwitterLogo } from "./assets/twitter.svg";
import { ReactComponent as TwitterLogo2 } from "./assets/twitter2.svg";

export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMiwidXNlcm5hbWUiOiJpYnJhaGltMiIsImlhdCI6MTY4NjA2MjM4MiwiZXhwIjoxNzE3NjE5OTgyfQ.b7EBuGt2CxAgMxvGj1UysD1kQJPE8FDNi9rKWA8y8U8";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [tweetInputVisible, setTweetInputVisible] = useState(false);
  const [tweetContent, setTweetContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/posts-comments",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTweetClick = () => {
    setTweetInputVisible(true);
  };

  const handleInputChange = (e) => {
    setTweetContent(e.target.value);
  };

  const handleSubmitTweet = async () => {
    try {
      // Make the HTTP request to submit the tweet
      await axios.post(
        "http://localhost:9000/api/posts",
        {
          content: tweetContent,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Reset the tweet input after successful submission
      setTweetContent("");
      setTweetInputVisible(false);

      // Fetch the updated list of posts
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelTweet = () => {
    setTweetContent("");
    setTweetInputVisible(false);
  };

  return (
    <div className="app bg-gray-200 min-h-screen p-4">
      <div className="grid grid-cols-12 gap-4">
        {/* Sol Bölüm */}
        <div className="col-span-12 sm:col-span-2">
          <button className="sidebar-icon flex items-center">
            <TwitterLogo2 className="w-6 h-6 text-blue-400" />
            <TwitterLogo2 className="w-6 h-6 text-blue-400" />
            <TwitterLogo2 className="w-6 h-6 text-blue-400" />
            <span className="ml-2 mr-2 text-2xl font-twitter font-bold text-gray-900">
              Tweetify
            </span>
            <TwitterLogo className="w-6 h-6 text-blue-400" />
            <TwitterLogo className="w-6 h-6 text-blue-400" />
            <TwitterLogo className="w-6 h-6 text-blue-400" />
          </button>
          <div className="sticky top-20">
            <div className="flex flex-col items-start mb-4 space-y-2">
              <button className="sidebar-icon">
                <i className="fas fa-home"></i>
                <span className="ml-2 font-twitter">Anasayfa</span>
              </button>
              <button className="sidebar-icon">
                <i className="fas fa-compass"></i>
                <span className="ml-2 font-twitter">Keşfet</span>
              </button>
              <button className="sidebar-icon">
                <i className="fas fa-bell"></i>
                <span className="ml-2 font-twitter">Bildirimler</span>
              </button>
              <button className="sidebar-icon">
                <i className="fas fa-envelope"></i>
                <span className="ml-2 font-twitter">Mesajlar</span>
              </button>
              <button className="sidebar-icon">
                <i className="fas fa-bookmark"></i>
                <span className="ml-2 font-twitter">Yer İşaretleri</span>
              </button>
              <button className="sidebar-icon">
                <i className="fas fa-list"></i>
                <span className="ml-2 font-twitter">Listeler</span>
              </button>
              <button className="sidebar-icon">
                <i className="fas fa-user"></i>
                <span className="ml-2 font-twitter">Profil</span>
              </button>
              <div className="flex-grow"></div>
              {!tweetInputVisible ? (
                <button
                  className="twit-button bg-blue-400 rounded-full p-2 sm:p-2 sm:px-4"
                  onClick={handleTweetClick}
                >
                  <i className="fas fa-feather-alt text-white"></i>
                  <span className="ml-2 font-twitter font-bold text-white">
                    Tweetle
                  </span>
                </button>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ne düşünüyorsun?"
                      className="tweet-input bg-gray-300 rounded-full pl-6 pr-4 py-2 w-full"
                      value={tweetContent}
                      onChange={handleInputChange}
                    />
                    <button
                      className="cancel-tweet absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={handleCancelTweet}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <button
                    className="tweet-button bg-blue-400 rounded-full p-2 sm:p-2 sm:px-4 text-white font-bold"
                    onClick={handleSubmitTweet}
                  >
                    Tweetle
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Orta Bölüm */}
        <div className="col-span-12 sm:col-span-7">
          <h1 className="text-2xl font-bold mb-4 text-center ">
            En Son Tweetler
          </h1>
          <PostList posts={posts} />
        </div>

        {/* Sağ Bölüm */}
        <div className="col-span-12 sm:col-span-3">
          <div className="sticky top-10 ">
            <div className="mb-4 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <i className="fas fa-search text-gray-500"></i>
              </span>
              <input
                type="text"
                placeholder="Twitter'da Ara"
                className="search-input bg-gray-300 rounded-full pl-10 pr-4 py-2 w-full"
              />
            </div>

            <div className="mb-4">
              <h2 className="text-l font-bold mb-2">
                İlginizi Çekebilecek Gündemler
              </h2>
              {/* Gündemler */}
              <ul className="hashtag-list">
                <li className="hashtag-item">yazılım geliştirme</li>
                <li className="hashtag-item">frontend </li>
                <li className="hashtag-item">tailwind ile css</li>
                <li className="hashtag-item">nodeJs bitecek mi?</li>
                <li className="hashtag-item">reactJs projeleri</li>
                <li className="hashtag-item">fullstack web</li>
                <li className="hashtag-item">absürd şeyler</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
