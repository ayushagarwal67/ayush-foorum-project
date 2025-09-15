import React, { useState, useEffect, useRef } from "react";
import PostEditor from "../components/PostEditor";
import { getPosts, addPost } from "../utils";
import PostComponent from "../components/Post";
import type { FeedPageProps, Post } from "../types";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

export default function FeedPage({
  isAuthenticated,
  currentUserEmail,
  onAuthSuccess,
}: FeedPageProps & { onAuthSuccess: (email: string) => void }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [modalView, setModalView] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    if (isAuthenticated) {
      setPosts(getPosts());
    }
  }, [isAuthenticated]);

  const handlePublish = (content: string) => {
    if (!isAuthenticated || !currentUserEmail) {
      setModalView("signin");
      setShowAuthModal(true);
      return;
    }
    const newPost: Post = {
      id: Date.now(),
      email: currentUserEmail,
      author: currentUserEmail.split("@")[0],
      content,
      timestamp: new Date().toISOString(),
    };
    addPost(newPost);
    setPosts([newPost, ...posts]);
  };

  const handleFeedInteract = () => {
    if (!isAuthenticated) {
      setModalView("signin");
      setShowAuthModal(true);
    } else {
      alert("no need to implement full functionality");
    }
  };

  // Close modal on outside click
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowAuthModal(false);
      }
    };
    if (showAuthModal) window.addEventListener("mousedown", handleOutsideClick);
    else window.removeEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [showAuthModal]);

  return (
    <>
      {/* Main content */}
      <main className="flex flex-col max-w-3xl mx-auto px-6 h-[calc(100vh-68px)]">
        {/* Sticky Post Editor */}
        <div className="flex-none mb-8 mt-4">
          <PostEditor onPublish={handlePublish} isAuthenticated={isAuthenticated} />
        </div>
        {/* Scrollable Posts List without visible scrollbar */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          <style>
            {`
div::-webkit-scrollbar { display: none; }
`}
          </style>

          {posts.length === 0 ? (
            <p className="text-center text-gray-500 text-sm font-medium">
              {isAuthenticated ? "No posts yet. Create one!" : "Sign in to view posts."}
            </p>
          ) : (
            <div className="flex flex-col">
              {posts.map((post) => (
                <PostComponent
                  key={post.id}
                  post={post}
                  currentUserEmail={currentUserEmail}
                  onInteract={handleFeedInteract}
                />
              ))}
            </div>
          )}
        </div>
      </main>


      {/* Auth modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-20 w-full">
          <div ref={modalRef} className="w-[448px]">
            {modalView === "signin" ? (
              <SignInPage
                onAuthSuccess={(email) => {
                  setShowAuthModal(false);
                  onAuthSuccess(email);
                }}
                switchToSignUp={() => setModalView("signup")}
                isModal
              />
            ) : (
              <SignUpPage
                onAuthSuccess={(email) => {
                  setShowAuthModal(false);
                  onAuthSuccess(email);
                }}
                switchToSignIn={() => setModalView("signin")}
                isModal
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
