import { useState } from "react";
import { Link } from "react-router-dom";
import { getUserByEmail, isValidEmail, isValidPassword } from "../utils";
import { IoLogInOutline } from "react-icons/io5";
import type { SignInPageProps } from "../types";

export default function SignInPage({ onAuthSuccess, isModal = false, switchToSignUp }: SignInPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = () => {
    setError("");
    if (!isValidEmail(email)) return setError("Invalid email format");
    if (!isValidPassword(password)) return setError("Password too short");
    const user = getUserByEmail(email);
    if (!user || user.password !== password) return setError("Invalid credentials");
    onAuthSuccess(email);
  };

  return (
    <div className={isModal ? "flex items-center justify-center" : "flex items-center justify-center py-16"}>
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-[20px]">
          <div className="w-[48px] h-[48px] bg-gray-100 rounded-full flex items-center justify-center">
            <IoLogInOutline className="w-[28px] h-[28px] relative right-[2px] text-gray-900" />
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="text-center mb-8">
          <h1 className="font-bold text-gray-900 mb-[2px]">Sign in to continue</h1>
          <p className="text-gray-500 text-xs">Sign in to access all the features on this app</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email or username
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email or username"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          {/* Sign In Button */}
          <button
            onClick={handleSignIn}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 focus:outline-none"
          >
            Sign In
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-8 text-sm">
          <span className="text-gray-700">Do not have an account? </span>
          {isModal && switchToSignUp ? (
            <button
              onClick={switchToSignUp}
              className="text-blue-600 font-semibold hover:text-blue-500 cursor-pointer border-none focus:outline-none"
            >
              Sign Up
            </button>
          ) : (
            <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-500">
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
