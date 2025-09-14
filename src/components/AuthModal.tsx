import React from "react";

interface Props {
  onSignIn: () => void;
  onSignUp: () => void;
  onClose: () => void;
}

export default function AuthModal({ onSignIn, onSignUp, onClose }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-md p-6 shadow-xl w-80">
        <h2 className="text-lg font-semibold mb-2">Sign in to continue</h2>
        <button
          className="w-full py-2 mb-3 bg-blue-500 text-white rounded"
          onClick={onSignIn}
        >
          Sign In
        </button>
        <button
          className="w-full py-2 bg-gray-200 rounded"
          onClick={onSignUp}
        >
          Sign Up
        </button>
        <button
          className="mt-3 text-sm text-gray-500 underline"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
