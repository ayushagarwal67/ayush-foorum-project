import React from "react";
// import { Post as PostType } from "../types";

export interface Post {
    id: number;
    author: string;
    content: string;
    timestamp: string;
  }

interface Props {
  post: Post;
}

export default function Post({ post }: Props) {
  return (
    <div className="mb-4 p-4 bg-white rounded shadow flex gap-2 items-center">
      <div className="w-8 h-8 rounded-full bg-gray-300"></div>
      <div>
        <div className="font-semibold">
          {post.author} <span className="text-xs text-gray-500">{post.timestamp}</span>
        </div>
        <div>{post.content}</div>
        <div className="flex gap-2 mt-2">
          {["Like", "Reply", "Share"].map(btn => (
            <button
              key={btn}
              className="text-xs bg-gray-100 px-2 py-1 rounded"
              onClick={() => alert("function not implemented")}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
