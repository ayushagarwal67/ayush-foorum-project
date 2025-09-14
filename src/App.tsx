import React, { useState } from "react";
import FeedPage from './pages/FeedPage'
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [page, setPage] = useState<"feed" | "signin" | "signup">("feed");

  const handleAuth = () => setIsAuthenticated(true);

  return (
    <div className="min-h-screen w-screen bg-gray-100">
      {page === "feed" && (
        <FeedPage
          isAuthenticated={isAuthenticated}
          onShowSignIn={() => setPage("signin")}
          onShowSignUp={() => setPage("signup")}
        />
      )}
      {page === "signin" && (
        <SignInPage
          onAuthSuccess={() => {
            setIsAuthenticated(true);
            setPage("feed");
          }}
          onShowSignUp={() => setPage("signup")}
        />
      )}
      {page === "signup" && (
        <SignUpPage
          onAuthSuccess={() => {
            setIsAuthenticated(true);
            setPage("feed");
          }}
          onShowSignIn={() => setPage("signin")}
        />
      )}
    </div>
  );
}

export default App;

