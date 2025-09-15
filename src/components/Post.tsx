import { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineModeComment } from "react-icons/md";
import { TbSend } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";
import { timeAgo } from "../utils";
import type { PostComponentProps } from "../types";
import { PREVIEW_LENGTH } from "../constant";

export default function PostComponent({ post, currentUserEmail, onInteract }: PostComponentProps) {
  const [expanded, setExpanded] = useState(false);
  const isMine = post.email === currentUserEmail;
  const displayName = isMine ? "You" : post.author;

  const shouldTruncate = post.content.length > PREVIEW_LENGTH;
  const displayedText = !shouldTruncate
    ? post.content
    : expanded
      ? post.content
      : post.content.slice(0, PREVIEW_LENGTH) + "...";
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex mb-4">
      {post.avatarUrl ? (
        <img
          src={post.avatarUrl}
          alt={displayName}
          className="w-10 h-10 rounded-full object-cover mr-4"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
          <RxAvatar className="text-gray-400" size={24} />
        </div>
      )}

      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-900">{displayName}</span>
          <span className="text-xs text-gray-500">{timeAgo(post.timestamp)}</span>
        </div>

        {/* Use break-all to wrap unbroken strings */}
        <p className="text-gray-800 mb-2 leading-relaxed break-all">
          {displayedText}
        </p>

        {shouldTruncate && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-blue-600 focus:outline-none hover:text-blue-800 mb-2 border-none"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
        <div className="flex items-center space-x-6">
          <IoMdHeartEmpty
            size={20}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onInteract}
          />
          <MdOutlineModeComment
            size={20}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onInteract}
          />
          <TbSend
            size={20}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onInteract}
          />
        </div>
      </div>
    </div>
  );
}

