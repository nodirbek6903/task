import { useState } from "react";
import { FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [toggleEye, setToggleEye] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEyeClick = () => {
    setToggleEye(!toggleEye);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!login.trim() || !password.trim()) {
      setError("Login va parolni kiriting!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) => user.username === login && user.password === password
    );

    if (!user) {
      setError("Login yoki parol noto'g'ri!");
      return;
    }

    setError("");
    setLogin("");
    setPassword("");

    setToken("true");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      <div
        data-aos="fade-up" 
        className="bg-white shadow-lg rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md p-6 sm:p-8"
      >
        <h1
          data-aos="zoom-in" 
          className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-6"
        >
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {error && (
            <div
              data-aos="fade-down" 
              className="bg-red-100 text-red-700 p-3 rounded-lg text-center text-sm"
            >
              {error}
            </div>
          )}

          <div data-aos="fade-right">
            <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
              Login
            </label>
            <div className="flex items-center border rounded-xl px-3 py-2 gap-2 focus-within:border-green-600">
              <FaUser className="text-gray-500 text-lg" />
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Login kiriting"
                className="outline-none flex-1 text-gray-700 text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Password Input */}
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
                onClick={handleEyeClick}
                className="text-gray-500 hover:text-gray-700"
              >
                {toggleEye ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            data-aos="flip-up"
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white font-semibold py-2 sm:py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Kirish
          </button>
        </form>

        <p
          data-aos="fade-up"
          className="text-center mt-4 text-gray-600 text-sm sm:text-base"
        >
          Hisobingiz yo‘qmi?{" "}
          <Link
            to="/register"
            className="text-sky-400 hover:underline font-medium"
          >
            Ro‘yxatdan o‘tish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
