import React, { useState } from "react";
import axios from "axios";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9000/api/auth/register",
        {
          username: username,
          password: password,
          email: email,
          avatar: avatar,
        }
      );

      // Save the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Pass the token to the App component
      onRegister(response.data.token);

      // Reset the form
      setUsername("");
      setPassword("");
      setEmail("");
      setAvatar("");
      setMessage("Kayıt başarılı, lütfen giriş yapın.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      window.location.reload();
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div>
      <button
        className="toggle-form-button bg-blue-400 rounded-full p-2 sm:p-2 sm:px-4 text-white font-bold mb-4"
        onClick={toggleFormVisibility}
      >
        {formVisible ? "Kaydol" : "Kaydol"}
      </button>
      {formVisible && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {message && (
            <p
              className={
                message.includes("başarısız")
                  ? "text-red-500 mb-4"
                  : "text-green-500 mb-4"
              }
            >
              {message}
            </p>
          )}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Kullanıcı Adı:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Şifre:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="avatar"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Avatar:
            </label>
            <input
              type="text"
              id="avatar"
              value={avatar}
              onChange={handleAvatarChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Kaydol
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
