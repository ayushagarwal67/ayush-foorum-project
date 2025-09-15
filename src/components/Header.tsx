import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import type { HeaderProps } from "../types";
import { IoLogInOutline } from "react-icons/io5";

export default function Header({ isAuthenticated, onLogout }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  const handleLogout = () => {
    onLogout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-100 flex justify-between items-center px-6 py-4 shadow z-10">
      <div
        className="text-sm font-bold text-gray-800 cursor-pointer"
        onClick={() => navigate("/feed")}
      >
        foo-rum
      </div>

      {isAuthPage ? (
  <button
    onClick={() => navigate("/feed")}
    className="flex items-center gap-2 text-gray-800 hover:text-gray-600 focus:outline-none text-sm font-bold border-none"
  >
    Back to Home
  </button>
) : isAuthenticated ? (
  <button
    onClick={handleLogout}
    className="flex items-center gap-2 text-gray-800 hover:text-gray-600 focus:outline-none text-sm font-bold border-none"
  >
    Logout
    <IoLogInOutline className="w-5 h-5 rotate-180" />
  </button>
) : (
  <Link
    to="/signin"
    className="flex items-center gap-2 text-gray-800 hover:text-gray-600 focus:outline-none text-sm font-bold"
  >
    Login
    <IoLogInOutline className="w-5 h-5" />
  </Link>
)}
    </header>
  );
}
