import React, { useState } from "react";

interface Props {
  onAuthSuccess: () => void;
  onShowSignUp?: () => void;
}

export default function SignInPage({ onAuthSuccess, onShowSignUp }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (username && password) onAuthSuccess();
    else alert("Enter credentials");
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign In</h2>
      <input
        className="block w-full mb-2 border p-2 rounded"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="block w-full mb-4 border p-2 rounded"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        className="w-full bg-blue-500 text-white py-2 rounded mb-2"
        onClick={handleSignIn}
      >
        Sign In
      </button>
      <button
        className="w-full bg-gray-200 py-2 rounded"
        onClick={onShowSignUp}
      >
        Go to Sign Up
      </button>
    </div>
  );
}
