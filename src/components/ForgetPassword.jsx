import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("email"); // email, otp, resetPassword
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Step 1: Send OTP to email
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/forgot-password`,
        { email }
      );

      setMessage(res.data.message || "OTP sent to your email!");
      setStep("otp");
      setTimeout(() => {
        navigate("/reset-password");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }

    try {
      // We're not making a separate verification call here
      // Instead, we'll verify when resetting password
      setMessage("OTP verified! Now set your new password.");
      setStep("resetPassword");
    } catch (err) {
      setError("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (!newPassword || !confirmPassword) {
      setError("Please enter both passwords");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/user/reset-password`,
        {
          email,
          otp,
          newPassword,
        }
      );

      setMessage(res.data.message || "Password reset successfully!");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
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

  // Handle Resend OTP
  const handleResendOTP = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/forgot-password`,
        { email }
      );
      setMessage("OTP resent to your email!");
      setCanResend(false);
      setResendTimer(60);
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage(null);
    setError(null);
  };

  return (
    <div
      className={`flex min-h-screen flex-col z-40 justify-center bg-black text-black items-center`}
    >
      <div
        className="w-full max-w-sm sm:max-w-lg md:max-w-2xl relative p-1 sm:p-6 md:p-8 my-2 sm:my-8 z-40"
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
              className="text-lg ml-[-3px] md:-ml-8 sm:text-xl md:text-3xl font-light tracking-[0.2em] sm:tracking-[0.3em] text-gray-800 mb-2 sm:mb-4 item-center justify-center flex mx-auto"
              style={{
                fontWeight: 400,
                fontSize: "clamp(18px, 4vw, 32px)",
                fontStyle: "regular",
              }}
            >
              R S V P
            </h1>
            <p className="text-black text-center text-sm md:text-lg ml-[-5%]">
              {step === "email" && "Forgot Password"}
              {step === "otp" && "Verify OTP"}
              {step === "resetPassword" && "Reset Password"}
            </p>
            <h4 className="text-xs text-black md:text-sm w-[80%] md:w-[60%] text-center ml-[8%] md:ml-[16%] mt-3">
              {step === "email" &&
                "Enter your registered email address below, and we'll send you an OTP to reset your password."}
              {step === "otp" && "Enter the 6-digit OTP sent to your email."}
              {step === "resetPassword" && "Enter your new password below."}
            </h4>

            <button
              className="absolute top-[5px] right-25 cursor-pointer hidden md:block"
              onClick={() => navigate("/")}
            >
              x
            </button>

            <button
              className="absolute top-15 right-12 block md:hidden"
              onClick={() => navigate("/")}
            >
              x
            </button>
          </div>

          {/* ========== STEP 1: EMAIL ========== */}
          {step === "email" && (
            <form
              className="signup-form space-y-2.5 mt-6 sm:space-y-2 flex-1 flex flex-col justify-center z-[40] md:ml-1"
              onSubmit={handleSendOTP}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL"
                style={{ fontWeight: 400, fontSize: "16px" }}
                className="w-[90%] sm:w-[88%] h-10 sm:h-11 md:h-11 md:w-[400px] placeholder:text-[13px] bg-white border border-gray-300 rounded-md px-3 sm:px-4 text-center text-sm sm:text-base font-regular placeholder:font-medium placeholder:text-[black] focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />

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
                  {loading ? "Sending..." : "SEND OTP"}
                </button>
              </div>
            </form>
          )}

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

          {step === "email" && (
            <span className="text-center ml-[-15%] mt-4 text-sm">
              Remember your password?{" "}
              <Link className="text-[#042a91] hover:underline" to={"/login"}>
                Login
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
