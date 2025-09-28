import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    AOS.init({
      duration: 800, 
      once: true,    
      easing: "ease-in-out", 
    });
  }, []);


  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Home setToken={setToken} /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/login"
        element={token ? <Navigate to="/" replace /> : <Login setToken={setToken} />}
      />
      <Route
        path="/register"
        element={token ? <Navigate to="/" replace /> : <Register setToken={setToken} />}
      />
    </Routes>
  );
}

export default App;
