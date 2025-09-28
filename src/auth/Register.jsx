import { useState } from "react";
import { FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggleEye, setToggleEye] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Username va parolni kiriting!");
      return;
    }

    const existingUser = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUser.some((user) => user.username === username);

    if (userExists) {
      setError("Bu username allaqachon mavjud");
      return;
    }

    const newUser = { username, password };
    const updatedUsers = [...existingUser, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Token yaratish
    setToken("true");

    setUsername("");
    setPassword("");
    setError("");

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      <div
        data-aos="fade-up" 
        className="bg-white shadow-lg rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8"
      >
        {/* Title */}
        <h1
          data-aos="zoom-in" 
          className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-6"
        >
          Register
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {error && (
            <div
              data-aos="fade-down" 
              className="bg-red-100 text-red-700 p-3 rounded-lg text-center text-sm"
            >
              {error}
            </div>
          )}

          {/* Username */}
          <div data-aos="fade-right">
            <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
              Username
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 gap-2 focus-within:border-green-600">
              <FaUser className="text-gray-500 text-lg" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username kiriting"
                className="outline-none flex-1 text-gray-700 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Password */}
          <div data-aos="fade-left">
            <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
              Parol
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 gap-2 focus-within:border-green-600">
              <FaLock className="text-gray-500 text-lg" />
              <input
                type={toggleEye ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parol kiriting"
                className="outline-none flex-1 text-gray-700 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setToggleEye(!toggleEye)}
                className="text-gray-500 hover:text-gray-700"
              >
                {toggleEye ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            data-aos="flip-up"
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white font-semibold py-2 sm:py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Ro‘yxatdan o‘tish
          </button>
        </form>

        {/* Link */}
        <p
          data-aos="fade-up"
          className="text-center mt-4 text-gray-600 text-sm sm:text-base"
        >
          Hisobingiz bormi?{" "}
          <Link
            to="/login"
            className="text-sky-400 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
