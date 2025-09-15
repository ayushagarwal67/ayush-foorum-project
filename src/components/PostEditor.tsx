import React, { useState, useEffect } from "react";
import {
  HiOutlineEmojiHappy,
  HiOutlineTrash,
  HiOutlinePlus,
} from "react-icons/hi";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatListBulleted,
  MdFormatListNumbered,
} from "react-icons/md";
import { PiQuotes } from "react-icons/pi";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { LuSendHorizontal } from "react-icons/lu";
import Tooltip from "../atoms/Tooltip";
import type { PostEditorProps } from "../types";


// TODO: MOVE TO TYPES
interface FormattingState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  bulletList: boolean;
  numberedList: boolean;
  quote: boolean;
  code: boolean;
}

const toolbarButtons: {
  key: keyof FormattingState;
  Icon: React.ElementType;
  tooltip: string;
}[] = [
  { key: "bold", Icon: MdFormatBold, tooltip: "Bold (Ctrl+B)" },
  { key: "italic", Icon: MdFormatItalic, tooltip: "Italic (Ctrl+I)" },
  { key: "underline", Icon: MdFormatUnderlined, tooltip: "Underline (Ctrl+U)" },
  { key: "bulletList", Icon: MdFormatListBulleted, tooltip: "Bullet List" },
  { key: "numberedList", Icon: MdFormatListNumbered, tooltip: "Numbered List" },
  { key: "quote", Icon: PiQuotes, tooltip: "Quote" },
  { key: "code", Icon: HiOutlineCodeBracket, tooltip: "Code Block" },
];

export default function PostEditor({
  onPublish,
}: PostEditorProps) {
  const [content, setContent] = useState("");
  const [formatting, setFormatting] = useState<FormattingState>({
    bold: false,
    italic: false,
    underline: false,
    bulletList: false,
    numberedList: false,
    quote: false,
    code: false,
  });

  const handleUnimplementedClick = () => {
    alert("function not implemented");
  };

  const toggleFormatting = (type: keyof FormattingState) => {
    setFormatting((prev) => {
      const newState = { ...prev };
      if (type === "bulletList" && prev.numberedList) newState.numberedList = false;
      if (type === "numberedList" && prev.bulletList) newState.bulletList = false;
      newState[type] = !prev[type];
      return newState;
    });
  };

  const handlePublish = () => {
    if (content.trim()) {
      onPublish(content);
      setContent("");
      setFormatting({
        bold: false,
        italic: false,
        underline: false,
        bulletList: false,
        numberedList: false,
        quote: false,
        code: false,
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "enter":
            e.preventDefault();
            if (content.trim()) handlePublish();
            break;
          case "b":
            e.preventDefault();
            toggleFormatting("bold");
            break;
          case "i":
            e.preventDefault();
            toggleFormatting("italic");
            break;
          case "u":
            e.preventDefault();
            toggleFormatting("underline");
            break;
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [content]);

  const getFormatButtonStyle = (isActive: boolean) => `
    px-2 py-2
    ${isActive ? "bg-white shadow-md text-gray-900" : "bg-transparent text-gray-700"}
    rounded-lg
    border-none
    hover:bg-gray-100
    duration-200
    focus:outline-none
  `;

    const deleteButtonStyle = `
    p-2.5 rounded-lg bg-red-50 text-red-500 border-none
    hover:bg-red-100
    duration-200
    focus:outline-none
  `;

  const bottomActionButtonStyle = `
  px-2 py-2
  bg-transparent text-gray-700
  rounded-lg
  border-none
  hover:bg-gray-100
  duration-200
  focus:outline-none
`;

const sendButtonStyle = `
  p-2
  rounded-full 
  text-blue-600 
  hover:bg-blue-100 
  transition-colors duration-200 
  focus:outline-none
  flex items-center justify-center
  disabled:opacity-50
  disabled:pointer-events-none
  disabled:cursor-not-allowed
  mr-[20px]
`;

  return (
    <div className="bg-white rounded-2xl shadow-lg pt-5 pr-5 pl-5 pb-[8px] w-full max-w-4xl mx-auto border border-gray-100">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-xl">
        <div className="relative">
  <select
    className="px-4 py-2 pr-9 rounded-xl text-sm bg-white text-gray-900 border-none font-semibold focus:outline-none shadow-sm appearance-none"
  >
    <option>Paragraph</option>
    <option>Heading 1</option>
    <option>Heading 2</option>
    <option>Heading 3</option>
  </select>
  <HiChevronDown
    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-lg"
  />
</div>

          {/* Format Buttons */}
          <div className="flex items-center gap-1">
            {toolbarButtons.slice(0, 3).map(({ key, Icon, tooltip }) => (
              <Tooltip key={key} content={tooltip}>
                <button
                  onClick={() => {
                    handleUnimplementedClick();
                    toggleFormatting(key);
                  }}
                  className={getFormatButtonStyle(formatting[key])}
                >
                  <Icon className="text-lg" />
                </button>
              </Tooltip>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* List Buttons */}
          <div className="flex items-center gap-1">
            {toolbarButtons.slice(3, 5).map(({ key, Icon, tooltip }) => (
              <Tooltip key={key} content={tooltip}>
                <button
                  onClick={() => {
                    handleUnimplementedClick();
                    toggleFormatting(key);
                  }}
                  className={getFormatButtonStyle(formatting[key])}
                >
                  <Icon className="text-lg" />
                </button>
              </Tooltip>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Quote and Code Buttons */}
          <div className="flex items-center gap-1">
            {toolbarButtons.slice(5).map(({ key, Icon, tooltip }) => (
              <Tooltip key={key} content={tooltip}>
                <button
                  onClick={() => {
                    handleUnimplementedClick();
                    toggleFormatting(key);
                  }}
                  className={getFormatButtonStyle(formatting[key])}
                >
                  <Icon className="text-lg" />
                </button>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Delete Button */}
        <Tooltip content="Delete Draft">
          <button
            onClick={handleUnimplementedClick}
            className={deleteButtonStyle}
          >
            <HiOutlineTrash className="text-lg" />
          </button>
        </Tooltip>
      </div>

      {/* Text Area */}
  <div className="flex gap-3">
    <HiOutlineEmojiHappy className="relative top-1 text-xl text-gray-500" /> {/* Slightly darker icon */}
    <textarea
      value={content}
      placeholder="How are you feeling today?"
      className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 resize-none text-lg"
      rows={6}
      onChange={e => setContent(e.target.value)}
    />
  </div>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-300 -mx-[20px]">
        <div className="flex items-center gap-[2px] ml-[20px]">
  <button
    onClick={handleUnimplementedClick}
    className={bottomActionButtonStyle}
  >
    <HiOutlinePlus className="text-lg" />
  </button>
  <button
    onClick={handleUnimplementedClick}
    className={bottomActionButtonStyle}
  >
    <MdOutlineKeyboardVoice className="text-lg" />
  </button>
  <button
    onClick={handleUnimplementedClick}
    className={bottomActionButtonStyle}
  >
    <IoVideocamOutline className="text-lg" />
  </button>
</div>

        {/* Send Button */}
        <button
  className={sendButtonStyle}
  disabled={!content.trim()}
  onClick={handlePublish}
>
  <LuSendHorizontal className="text-lg" />
</button>
      </div>
    </div>
  );
}

