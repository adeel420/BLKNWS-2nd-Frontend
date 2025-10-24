import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPopup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/login`,
        formData
      );

      // Store token and user data in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(res.data.message || "Login successful!");
      setFormData({ email: "" });

      // Redirect to home after 1 second
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/95 text-black z-[9999]"
      onClick={() => navigate("/")}
    >
      {/* ====================================================== */}
      {/* 📱 MOBILE VERSION */}
      {/* ====================================================== */}
      <div
        className="relative flex flex-col items-center w-[90%] max-w-sm bg-transparent md:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={assets.backSvg}
          alt="background"
          className="w-full object-contain mx-auto mb-4"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
          <h1 className="text-gray-800 font-light tracking-[0.3em] text-xl">
            R S V P
          </h1>
          <p className="text-black text-sm mt-1 mb-3">Login Now</p>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-3"
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="YOUR EMAIL"
              required
              disabled={loading}
              className="w-[85vw] max-w-[350px] h-10 text-center bg-white border border-gray-300 rounded-md text-sm placeholder:text-black placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-[150px] h-9 bg-black text-white hover:bg-gray-800 rounded-md text-sm font-semibold tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>

          <span className="text-center mt-3 text-sm">
            Don't have an account?{" "}
            <Link className="text-[#042a91] font-semibold" to="/signup">
              Signup
            </Link>
          </span>

          <button
            className="absolute top-3 right-3 text-black text-xl font-bold"
            onClick={() => navigate("/")}
          >
            ×
          </button>
        </div>
      </div>

      {/* ====================================================== */}
      {/* 💻 DESKTOP VERSION */}
      {/* ====================================================== */}
      <div
        className="hidden md:block relative w-[90%] max-w-[500px]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={assets.backSvg}
          alt="background"
          className="w-full h-auto object-contain mx-auto"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
          <div className="text-center mb-6 relative">
            <h1 className="text-gray-800 font-light tracking-[0.3em] text-2xl md:text-3xl">
              R S V P
            </h1>
            <p className="text-black text-lg mt-2">Login Now</p>

            <button
              className="absolute -top-2 right-[-75px] text-black text-2xl font-bold"
              onClick={() => navigate("/")}
            >
              ×
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-4"
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="YOUR EMAIL"
              required
              disabled={loading}
              className="w-[85%] max-w-[400px] h-11 text-center bg-white border border-gray-300 rounded-md text-base placeholder:text-black placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-[200px] h-12 bg-black text-white hover:bg-gray-800 rounded-md text-base font-semibold tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
            {/* {message && (
              <p className="text-green-600 text-center md:mt-1 ml-[-50px] ml-[-100px] ">
                {message}
              </p>
            )}
            {error && (
              <p className="text-red-600 text-center md:mt-1 ml-[-50px] md:ml-[-100px]">
                {error}
              </p>
            )} */}
          </form>

          <span className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <Link className="text-[#042a91] font-semibold" to="/signup">
              Signup
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
