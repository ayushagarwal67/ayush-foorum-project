import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import FeedPage from "./pages/FeedPage";
import { initializeLocalStorage } from "./utils";
import Header from "./components/Header";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    initializeLocalStorage();
  }, []);

  const handleAuthSuccess = (email: string) => {
    setIsAuthenticated(true);
    setCurrentUser(email);
    navigate("/feed");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    navigate("/signin");
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto pt-[68px]">
      <Routes>
        <Route path="/" element={<Navigate to="/feed" replace />} />
        <Route
          path="/feed"
          element={
            <FeedPage
              isAuthenticated={isAuthenticated}
              currentUserEmail={currentUser}
              onLogout={handleLogout}
              onAuthSuccess={handleAuthSuccess}
            />
          }
        />
        <Route
          path="/signin"
          element={
            isAuthenticated ? (
              <Navigate to="/feed" replace />
            ) : (
              <SignInPage onAuthSuccess={handleAuthSuccess} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/feed" replace />
            ) : (
              <SignUpPage onAuthSuccess={handleAuthSuccess} />
            )
          }
        />
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/feed" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
      </main>
    </div>
  );
}
