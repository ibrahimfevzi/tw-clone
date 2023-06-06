import React from "react";
import PostList from "./components/PostList";
import axios from "axios";
import { useEffect, useState } from "react";
import { ReactComponent as TwitterLogo } from "./assets/twitter.svg";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/posts-comments",
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMiwidXNlcm5hbWUiOiJpYnJhaGltMiIsImlhdCI6MTY4NjAwOTc4OCwiZXhwIjoxNjg2MDk2MTg4fQ.TGvZajE_TMiqm3L872j37nkiG3il7B5YH3gdbWdvNMk",
          },
        }
      );
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app bg-gray-200 min-h-screen p-4">
      <div className="grid grid-cols-12 gap-4">
        {/* Sol Bölüm */}
        <div className="col-span-2">
          <button className="sidebar-icon flex items-center">
            <TwitterLogo className="w-6 h-6 text-blue-400" />
            <span className="ml-2 text-2xl font-twitter font-bold text-gray-900">
              Twitter
            </span>
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
              <button className="twit-button bg-blue-400 rounded-full p-2 px-20">
                <i className="fas fa-feather-alt text-white"></i>
                <span className="ml-2 font-twitter font-bold text-white">
                  Tweetle
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Orta Bölüm */}
        <div className="col-span-7">
          <h1 className="text-2xl font-bold mb-4 text-center ">
            En Son Tweetler
          </h1>
          <PostList posts={posts} />
        </div>

        {/* Sağ Bölüm */}
        <div className="col-span-2">
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
                <li className="hashtag-item">#Gündem1</li>
                <li className="hashtag-item">#Gündem2</li>
                <li className="hashtag-item">#Gündem3</li>
                <li className="hashtag-item">#Gündem3</li>
                <li className="hashtag-item">#Gündem3</li>
                <li className="hashtag-item">#Gündem3</li>
                <li className="hashtag-item">#Gündem3</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
