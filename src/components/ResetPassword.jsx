import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = ({ onClose, preFilledEmail = "" }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: preFilledEmail,
    otp: "",
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!formData.otp || formData.otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return false;
    }

    if (!formData.newPassword || formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (formData.newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/user/reset-password`,
        {
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        }
      );

      setMessage(res.data.message || "Password reset successfully!");
      setFormData({ email: "", otp: "", newPassword: "" });
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
        if (onClose) onClose();
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/");
    if (onClose) onClose();
  };

  return (
    <div
      className="flex flex-col min-h-screen justify-center text-black items-center bg-black"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm sm:max-w-lg md:max-w-2xl relative p-1 sm:p-6 md:p-8 my-2 sm:my-8"
        style={{ zIndex: 9999 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={assets.backSvg}
          className="hidden md:block relative w-100% object-cover h-[430px] sm:object-contain md:w-[90%]"
          alt="background"
        />
        <img
          src={assets.backSvg}
          className="block md:hidden signup-bg relative"
          alt="background"
        />

        <div className="absolute top-4 left-[5%] sm:top-12 md:left-[22%] w-[100%] sm:w-auto flex flex-col justify-center sm:justify-start md:w-[500px] md:-ml-11">
          <div className="text-center mb-3 sm:mb-0 md:-ml-14 rsvp-signup-div">
            <h1
              className="text-lg md:-ml-8 sm:text-xl md:text-3xl font-light tracking-[0.2em] sm:tracking-[0.3em] text-gray-800 mb-2 sm:mb-4 item-center justify-center flex mx-auto"
              style={{
                fontWeight: 400,
                fontSize: "clamp(18px, 4vw, 32px)",
                fontStyle: "regular",
              }}
            >
              R S V P
            </h1>
            <p className="text-black text-center text-sm md:text-lg ml-[-5%]">
              Reset Password
            </p>

            <button
              className="absolute top-[5px] right-25 cursor-pointer hidden md:block text-lg"
              onClick={handleClose}
            >
              ×
            </button>

            <button
              className="absolute top-15 right-12 block md:hidden text-lg"
              onClick={handleClose}
            >
              ×
            </button>
          </div>

          <form
            className="signup-form space-y-2.5 mt-6 sm:space-y-2 flex-1 flex flex-col justify-center md:ml-1"
            onSubmit={handleSubmit}
            style={{ zIndex: 9999 }}
          >
            {/* Email Input */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="YOUR EMAIL"
              style={{ fontWeight: 400, fontSize: "16px" }}
              className="w-[90%] sm:w-[88%] h-10 sm:h-11 md:h-11 md:w-[400px] placeholder:text-[13px] bg-white border border-gray-300 rounded-md px-3 sm:px-4 text-center text-sm sm:text-base font-regular placeholder:font-medium placeholder:text-[black] focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />

            {/* OTP Input */}
            <input
              type="text"
              name="otp"
              maxLength="6"
              value={formData.otp}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  otp: e.target.value.replace(/\D/g, ""),
                })
              }
              placeholder="YOUR OTP (6 DIGITS)"
              style={{ fontWeight: 400, fontSize: "16px" }}
              className="w-[90%] sm:w-[88%] h-10 sm:h-11 md:h-11 md:w-[400px] placeholder:text-[13px] bg-white border border-gray-300 rounded-md px-3 sm:px-4 text-center text-sm sm:text-base font-regular placeholder:text-[black] placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />

            {/* New Password Input */}
            <div className="relative w-[90%] sm:w-[88%] md:w-[400px]">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="YOUR NEW PASSWORD"
                style={{ fontWeight: 400, fontSize: "16px" }}
                className="w-full h-10 sm:h-11 md:h-11 placeholder:text-[13px] bg-white border border-gray-300 rounded-md px-3 sm:px-4 text-center text-sm sm:text-base font-regular placeholder:font-medium placeholder:text-[black] focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Confirm Password Input */}
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="CONFIRM PASSWORD"
              style={{ fontWeight: 400, fontSize: "16px" }}
              className="w-[90%] sm:w-[88%] h-10 sm:h-11 md:h-11 md:w-[400px] placeholder:text-[13px] bg-white border border-gray-300 rounded-md px-3 sm:px-4 text-center text-sm sm:text-base font-regular placeholder:font-medium placeholder:text-[black] focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />

            {/* Submit Button */}
            <div className="pt-0 sm:pt-0 md:pt-6 w-full flex items-center justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-[160px] sm:w-[200px] ml-[-40px] bg-black hover:bg-gray-800 text-white h-7 sm:h-7 md:h-12 text-sm sm:text-base md:text-lg font-bold tracking-wider rounded-md cursor-pointer md:-ml-[100px] disabled:opacity-50"
                style={{
                  fontWeight: 400,
                  fontSize: "clamp(16px, 4vw, 24px)",
                }}
              >
                {loading ? "Resetting..." : "RESET"}
              </button>
            </div>
          </form>

          {/* Messages */}
          {message && (
            <p className="text-green-600 text-center ml-[-15%] text-sm mt-4">
              ✅ {message}
            </p>
          )}
          {error && (
            <p className="text-red-600 text-center ml-[-15%] text-sm mt-4">
              ❌ {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
