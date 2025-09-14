import React, { useState } from "react";
import PostEditor from "../components/PostEditor";
import Post from "../components/Post";
import AuthModal from "../components/AuthModal";

interface Props {
  isAuthenticated: boolean;
  onShowSignIn: () => void;
  onShowSignUp: () => void;
}

export interface Post {
    id: number;
    author: string;
    content: string;
    timestamp: string;
  }

const initialPosts: Post[] = [
  { id: 1, author: "Theresa Webb", content: "Lorem ipsum dolor sit amet...", timestamp: "5 mins ago" },
  { id: 2, author: "John Doe", content: "Lorem ipsum dolor sit amet...", timestamp: "5 mins ago" },
  { id: 3, author: "Jane Doe", content: "Lorem ipsum dolor sit amet...", timestamp: "5 mins ago" },
];

export default function FeedPage({ isAuthenticated, onShowSignIn, onShowSignUp }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handlePublish = (content: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setPosts([
      {
        id: posts.length + 1,
        author: "Current User",
        content,
        timestamp: "just now",
      },
      ...posts,
    ]);
  };

  const handleFeedInteract = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      alert("function not implemented");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {showAuthModal && (
        <AuthModal
          onSignIn={() => {
            setShowAuthModal(false);
            onShowSignIn();
          }}
          onSignUp={() => {
            setShowAuthModal(false);
            onShowSignUp();
          }}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      <PostEditor onPublish={handlePublish}/>

      {posts.map(post => (
        <div key={post.id} onClick={handleFeedInteract}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}
