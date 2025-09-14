import React, { useState } from "react";

interface Props {
  onAuthSuccess: () => void;
  onShowSignIn?: () => void;
}

export default function SignUpPage({ onAuthSuccess, onShowSignIn }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (username && password) onAuthSuccess();
    else alert("Enter credentials");
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
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
        onClick={handleSignUp}
      >
        Sign Up
      </button>
      <button
        className="w-full bg-gray-200 py-2 rounded"
        onClick={onShowSignIn}
      >
        Go to Sign In
      </button>
    </div>
  );
}
