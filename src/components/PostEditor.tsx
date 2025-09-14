// import React, { useState, useEffect } from "react";
// import {
//   HiOutlineEmojiHappy,
//   HiOutlineMicrophone,
//   HiOutlinePaperClip,
//   HiOutlineArrowRight,
//   HiOutlineTrash,
//   HiOutlinePlus,
// } from "react-icons/hi";
// import { MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdFormatListBulleted, MdFormatListNumbered } from "react-icons/md";
// import { PiQuotes } from "react-icons/pi";
// import { HiOutlineCodeBracket } from "react-icons/hi2"
// import { HiChevronDown } from "react-icons/hi";


// import Tooltip from "../atoms/Tooltip";

// interface PostEditorProps {
//   onPublish: (content: string) => void;
//   isAuthenticated: boolean;
// }

// interface FormattingState {
//   bold: boolean;
//   italic: boolean;
//   underline: boolean;
//   bulletList: boolean;
//   numberedList: boolean;
//   quote: boolean;
//   code: boolean;
// }

// export default function PostEditor({ onPublish, isAuthenticated }: PostEditorProps) {
//   const [content, setContent] = useState("");
//   const [formatting, setFormatting] = useState<FormattingState>({
//     bold: false,
//     italic: false,
//     underline: false,
//     bulletList: false,
//     numberedList: false,
//     quote: false,
//     code: false
//   });

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.ctrlKey || e.metaKey) {
//         switch (e.key) {
//           case 'Enter':
//             e.preventDefault();
//             if (content.trim()) {
//               onPublish(content);
//               setContent("");
//             }
//             break;
//           case 'b':
//             e.preventDefault();
//             toggleFormatting('bold');
//             break;
//           case 'i':
//             e.preventDefault();
//             toggleFormatting('italic');
//             break;
//           case 'u':
//             e.preventDefault();
//             toggleFormatting('underline');
//             break;
//         }
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [content, onPublish]);

//   const toggleFormatting = (type: keyof FormattingState) => {
//     setFormatting(prev => {
//       const newState = { ...prev };

//       // Handle mutually exclusive list types
//       if (type === 'bulletList' && prev.numberedList) {
//         newState.numberedList = false;
//       }
//       if (type === 'numberedList' && prev.bulletList) {
//         newState.bulletList = false;
//       }

//       // Quote and code can be independent
//       newState[type] = !prev[type];
//       return newState;
//     });
//   };

//   const handleUnimplementedClick = () => {
//     alert("function not implemented");
//   };

//   const handlePublish = () => {
//     if (content.trim()) {
//       onPublish(content);
//       setContent("");
//       // Reset formatting on publish
//       setFormatting({
//         bold: false,
//         italic: false,
//         underline: false,
//         bulletList: false,
//         numberedList: false,
//         quote: false,
//         code: false
//       });
//     }
//   };

//   const getFormatButtonStyle = (isActive: boolean) => `
//   px-2 py-2
//   ${isActive ? 'bg-white shadow-md text-gray-900' : 'bg-transparent text-gray-700'}
//   rounded-lg
//   border-none
//   hover:bg-gray-100
//   duration-200
//   focus:outline-none
// `;
//   // Delete button with pink hover state
//   // const deleteButtonStyle = "p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 hover:border-red-300 transition-all duration-200";

//   const deleteButtonStyle = `
//   p-2.5
//   rounded-lg
//   bg-red-50
//   text-red-500
//   border-none
//   hover:bg-red-100
//   duration-200
//   focus:outline-none
// `;

//   // Bottom action button with circular hover background
//   const actionButtonStyle = "p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-all duration-200";

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-5 w-full max-w-4xl mx-auto border border-gray-100">
//       {/* Toolbar */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-xl">
//           {/* <select className="px-4 py-2.5 rounded-xl text-sm bg-white text-gray-900 border-none font-semibold focus:outline-none shadow-sm">
//             <option>Paragraph</option>
//             <option>Heading 1</option>
//             <option>Heading 2</option>
//             <option>Heading 3</option>
//           </select> */}
//           <div className="relative">
//   <select
//     className="px-2 py-2 pr-9 rounded-xl text-sm bg-white text-gray-900 border-none font-semibold focus:outline-none shadow-sm appearance-none"
//     // style={{ minWidth: "120px" }} // Optional: ensures dropdown width
//   >
//     <option>Paragraph</option>
//     <option>Heading 1</option>
//     <option>Heading 2</option>
//     <option>Heading 3</option>
//   </select>
//   <HiChevronDown
//     className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-lg"
//   />
// </div>

//           {/* Format Buttons - Can be simultaneously active */}
//           <div className="flex items-center gap-1">
//             <Tooltip content="Bold (Ctrl+B)">
//               <button
//                 onClick={() => {
//                   handleUnimplementedClick()
//                   toggleFormatting('bold')
//                 }}
//                 className={getFormatButtonStyle(formatting.bold)}
//               >
//                 <MdFormatBold className="text-lg" />
//               </button>
//             </Tooltip>

//             <Tooltip content="Italic (Ctrl+I)">
//               <button
//                 onClick={() => {
//                   handleUnimplementedClick()
//                   toggleFormatting('italic')}
//                 }
//                 className={getFormatButtonStyle(formatting.italic)}
//               >
//                 <MdFormatItalic className="text-lg" />
//               </button>
//             </Tooltip>

//             <Tooltip content="Underline (Ctrl+U)">
//               <button
//                 onClick={() => toggleFormatting('underline')}
//                 className={getFormatButtonStyle(formatting.underline)}
//               >
//                 <MdFormatUnderlined className="text-lg" />
//               </button>
//             </Tooltip>
//           </div>

//           {/* Vertical Divider */}
//           <div className="w-px h-6 bg-gray-300 mx-2"></div>

//           {/* List Buttons - Mutually exclusive */}
//           <div className="flex items-center gap-1">
//             <Tooltip content="Bullet List">
//               <button
//                 onClick={() => toggleFormatting('bulletList')}
//                 className={getFormatButtonStyle(formatting.bulletList)}
//               >
//                 <MdFormatListBulleted className="text-lg" />
//               </button>
//             </Tooltip>

//             <Tooltip content="Numbered List">
//               <button
//                 onClick={() => toggleFormatting('numberedList')}
//                 className={getFormatButtonStyle(formatting.numberedList)}
//               >
//                 <MdFormatListNumbered className="text-lg" />
//               </button>
//             </Tooltip>
//           </div>

//           {/* Another Divider */}
//           <div className="w-px h-6 bg-gray-300 mx-2"></div>

//           {/* Quote and Code Buttons - Can be independent */}
//           <div className="flex items-center gap-1">
//             <Tooltip content="Quote">
//               <button
//                 onClick={() => toggleFormatting('quote')}
//                 className={getFormatButtonStyle(formatting.quote)}
//               >
//                 <PiQuotes className="" />
//               </button>
//             </Tooltip>

//             <Tooltip content="Code Block">
//               <button
//                 onClick={() => toggleFormatting('code')}
//                 className={getFormatButtonStyle(formatting.code)}
//               >
//                 <HiOutlineCodeBracket />
//               </button>
//             </Tooltip>
//           </div>
//         </div>

//         {/* Trash Button with pink hover state */}
//         <Tooltip content="Delete Draft">
//           <button
//             onClick={handleUnimplementedClick}
//             className={deleteButtonStyle}
//           >
//             <HiOutlineTrash className="text-lg" />
//           </button>
//         </Tooltip>
//       </div>

//       {/* Text Area */}
//       <div className="bg-gray-800 rounded-xl p-5 mb-4 min-h-[160px] border border-gray-700 shadow-inner">
//         <div className="flex items-start gap-3">
//           <HiOutlineEmojiHappy className="text-xl text-gray-400 mt-1 flex-shrink-0" />
//           <textarea
//             value={content}
//             placeholder="How are you feeling today?"
//             className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 resize-none text-base leading-relaxed"
//             rows={6}
//             onChange={e => setContent(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Bottom Action Bar */}
//       <div className="flex items-center justify-between pt-2">
//         <div className="flex items-center gap-3">
//           <Tooltip content="Add Attachment">
//             <button
//               onClick={handleUnimplementedClick}
//               className={actionButtonStyle}
//             >
//               <HiOutlinePlus className="text-xl" />
//             </button>
//           </Tooltip>

//           <Tooltip content="Voice Message">
//             <button
//               onClick={handleUnimplementedClick}
//               className={actionButtonStyle}
//             >
//               <HiOutlineMicrophone className="text-xl" />
//             </button>
//           </Tooltip>

//           <Tooltip content="Attach File">
//             <button
//               onClick={handleUnimplementedClick}
//               className={actionButtonStyle}
//             >
//               <HiOutlinePaperClip className="text-xl" />
//             </button>
//           </Tooltip>
//         </div>

//         {/* Send Button */}
//         <Tooltip content="Send (Ctrl+Enter)" position="top">
//           <button
//             className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//             disabled={!content.trim()}
//             onClick={handlePublish}
//           >
//             <HiOutlineArrowRight className="text-xl" />
//           </button>
//         </Tooltip>
//       </div>

//       {/* Character Count */}
//       {content && (
//         <div className="flex justify-end mt-2">
//           <span className="text-xs text-gray-400">
//             {content.length} characters
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import {
//   HiOutlineEmojiHappy,
//   HiOutlineMicrophone,
//   HiOutlinePaperClip,
//   HiOutlineArrowRight,
//   HiOutlineTrash,
//   HiOutlinePlus,
// } from "react-icons/hi";
// import {
//   MdFormatBold,
//   MdFormatItalic,
//   MdFormatUnderlined,
//   MdFormatListBulleted,
//   MdFormatListNumbered,
// } from "react-icons/md";
// import { PiQuotes } from "react-icons/pi";
// import { HiOutlineCodeBracket } from "react-icons/hi2";

// import Tooltip from "../atoms/Tooltip";

// interface PostEditorProps {
//   onPublish: (content: string) => void;
//   isAuthenticated: boolean;
// }

// interface FormattingState {
//   bold: boolean;
//   italic: boolean;
//   underline: boolean;
//   bulletList: boolean;
//   numberedList: boolean;
//   quote: boolean;
//   code: boolean;
// }

// const toolbarButtons: {
//   key: keyof FormattingState;
//   Icon: React.ElementType;
//   tooltip: string;
// }[] = [
//   { key: "bold", Icon: MdFormatBold, tooltip: "Bold (Ctrl+B)" },
//   { key: "italic", Icon: MdFormatItalic, tooltip: "Italic (Ctrl+I)" },
//   { key: "underline", Icon: MdFormatUnderlined, tooltip: "Underline (Ctrl+U)" },
//   { key: "bulletList", Icon: MdFormatListBulleted, tooltip: "Bullet List" },
//   { key: "numberedList", Icon: MdFormatListNumbered, tooltip: "Numbered List" },
//   { key: "quote", Icon: PiQuotes, tooltip: "Quote" },
//   { key: "code", Icon: HiOutlineCodeBracket, tooltip: "Code Block" },
// ];

// export default function PostEditor({
//   onPublish,
//   isAuthenticated,
// }: PostEditorProps) {
//   const [content, setContent] = useState("");
//   const [formatting, setFormatting] = useState<FormattingState>({
//     bold: false,
//     italic: false,
//     underline: false,
//     bulletList: false,
//     numberedList: false,
//     quote: false,
//     code: false,
//   });

//   const handleUnimplementedClick = () => {
//     alert("function not implemented");
//   };

//   const toggleFormatting = (type: keyof FormattingState) => {
//     setFormatting((prev) => {
//       const newState = { ...prev };

//       // Mutually exclusive lists
//       if (type === "bulletList" && prev.numberedList) {
//         newState.numberedList = false;
//       }
//       if (type === "numberedList" && prev.bulletList) {
//         newState.bulletList = false;
//       }

//       newState[type] = !prev[type];
//       return newState;
//     });
//   };

//   const handlePublish = () => {
//     if (content.trim()) {
//       onPublish(content);
//       setContent("");
//       // Reset formatting on publish
//       setFormatting({
//         bold: false,
//         italic: false,
//         underline: false,
//         bulletList: false,
//         numberedList: false,
//         quote: false,
//         code: false,
//       });
//     }
//   };

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.ctrlKey || e.metaKey) {
//         switch (e.key.toLowerCase()) {
//           case "enter":
//             e.preventDefault();
//             if (content.trim()) {
//               handlePublish();
//             }
//             break;
//           case "b":
//             e.preventDefault();
//             toggleFormatting("bold");
//             break;
//           case "i":
//             e.preventDefault();
//             toggleFormatting("italic");
//             break;
//           case "u":
//             e.preventDefault();
//             toggleFormatting("underline");
//             break;
//         }
//       }
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [content]);

//   const getFormatButtonStyle = (isActive: boolean) => `
//     px-2 py-2
//     ${isActive ? "bg-white shadow-md text-gray-900" : "bg-transparent text-gray-700"}
//     rounded-lg
//     border-none
//     hover:bg-gray-100
//     duration-200
//     focus:outline-none
//   `;

//   const deleteButtonStyle = `
//     p-2.5 rounded-lg bg-red-50 text-red-500 border-none
//     hover:bg-red-100
//     transition-all duration-200
//     focus:outline-none
//   `;

//   const actionButtonStyle = `
//     p-2 rounded-full text-gray-500
//     hover:text-gray-700 hover:bg-gray-200
//     transition-all duration-200
//     focus:outline-none
//   `;

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-5 w-full max-w-4xl mx-auto border border-gray-100">
//       {/* Toolbar */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-xl">
//           {/* Paragraph Dropdown */}
//           <select className="px-4 py-2.5 rounded-xl text-sm bg-white text-gray-900 border-none font-semibold focus:outline-none shadow-sm">
//             <option>Paragraph</option>
//             <option>Heading 1</option>
//             <option>Heading 2</option>
//             <option>Heading 3</option>
//           </select>

//           {/* Format Buttons */}
//           <div className="flex items-center gap-1">
//             {toolbarButtons.map(({ key, Icon, tooltip }) => (
//               <Tooltip key={key} content={tooltip}>
//                 <button
//                   onClick={() => {
//                     handleUnimplementedClick();
//                     toggleFormatting(key);
//                   }}
//                   className={getFormatButtonStyle(formatting[key])}
//                 >
//                   <Icon className="text-lg" />
//                 </button>
//               </Tooltip>
//             ))}
//           </div>
//         </div>

//         {/* Delete Button */}
//         <Tooltip content="Delete Draft">
//           <button
//             onClick={handleUnimplementedClick}
//             className={deleteButtonStyle}
//           >
//             <HiOutlineTrash className="text-lg" />
//           </button>
//         </Tooltip>
//       </div>

//       {/* Text Area */}
//       <div className="bg-gray-800 rounded-xl p-5 mb-4 min-h-[160px] border border-gray-700 shadow-inner">
//         <div className="flex items-start gap-3">
//           <HiOutlineEmojiHappy className="text-xl text-gray-400 mt-1 flex-shrink-0" />
//           <textarea
//             value={content}
//             placeholder="How are you feeling today?"
//             className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 resize-none text-base leading-relaxed"
//             rows={6}
//             onChange={(e) => setContent(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Bottom Action Bar */}
//       <div className="flex items-center justify-between pt-2">
//         <div className="flex items-center gap-3">
//           <Tooltip content="Add Attachment">
//             <button
//               onClick={handleUnimplementedClick}
//               className={actionButtonStyle}
//             >
//               <HiOutlinePlus className="text-xl" />
//             </button>
//           </Tooltip>

//           <Tooltip content="Voice Message">
//             <button
//               onClick={handleUnimplementedClick}
//               className={actionButtonStyle}
//             >
//               <HiOutlineMicrophone className="text-xl" />
//             </button>
//           </Tooltip>

//           <Tooltip content="Attach File">
//             <button
//               onClick={handleUnimplementedClick}
//               className={actionButtonStyle}
//             >
//               <HiOutlinePaperClip className="text-xl" />
//             </button>
//           </Tooltip>
//         </div>

//         {/* Send Button */}
//         <Tooltip content="Send (Ctrl+Enter)" position="top">
//           <button
//             className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//             disabled={!content.trim()}
//             onClick={handlePublish}
//           >
//             <HiOutlineArrowRight className="text-xl" />
//           </button>
//         </Tooltip>
//       </div>

//       {/* Character Count */}
//       {content && (
//         <div className="flex justify-end mt-2">
//           <span className="text-xs text-gray-400">{content.length} characters</span>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import {
//   HiOutlineEmojiHappy,
//   HiOutlineMicrophone,
//   HiOutlinePaperClip,
//   HiOutlineArrowRight,
//   HiOutlineTrash,
//   HiOutlinePlus,
// } from "react-icons/hi";
// import {
//   MdFormatBold,
//   MdFormatItalic,
//   MdFormatUnderlined,
//   MdFormatListBulleted,
//   MdFormatListNumbered,
// } from "react-icons/md";
// import { PiQuotes } from "react-icons/pi";
// import { HiOutlineCodeBracket } from "react-icons/hi2";

// import Tooltip from "../atoms/Tooltip";

// interface PostEditorProps {
//   onPublish: (content: string) => void;
//   isAuthenticated: boolean;
// }

// interface FormattingState {
//   bold: boolean;
//   italic: boolean;
//   underline: boolean;
//   bulletList: boolean;
//   numberedList: boolean;
//   quote: boolean;
//   code: boolean;
// }

// const toolbarButtons: {
//   key: keyof FormattingState;
//   Icon: React.ElementType;
//   tooltip: string;
// }[] = [
//   { key: "bold", Icon: MdFormatBold, tooltip: "Bold (Ctrl+B)" },
//   { key: "italic", Icon: MdFormatItalic, tooltip: "Italic (Ctrl+I)" },
//   { key: "underline", Icon: MdFormatUnderlined, tooltip: "Underline (Ctrl+U)" },
//   { key: "bulletList", Icon: MdFormatListBulleted, tooltip: "Bullet List" },
//   { key: "numberedList", Icon: MdFormatListNumbered, tooltip: "Numbered List" },
//   { key: "quote", Icon: PiQuotes, tooltip: "Quote" },
//   { key: "code", Icon: HiOutlineCodeBracket, tooltip: "Code Block" },
// ];

// export default function PostEditor({
//   onPublish,
//   isAuthenticated,
// }: PostEditorProps) {
//   const [content, setContent] = useState("");
//   const [formatting, setFormatting] = useState<FormattingState>({
//     bold: false,
//     italic: false,
//     underline: false,
//     bulletList: false,
//     numberedList: false,
//     quote: false,
//     code: false,
//   });

//   const handleUnimplementedClick = () => {
//     alert("function not implemented");
//   };

//   const toggleFormatting = (type: keyof FormattingState) => {
//     setFormatting((prev) => {
//       const newState = { ...prev };
//       if (type === "bulletList" && prev.numberedList) newState.numberedList = false;
//       if (type === "numberedList" && prev.bulletList) newState.bulletList = false;
//       newState[type] = !prev[type];
//       return newState;
//     });
//   };

//   const handlePublish = () => {
//     if (content.trim()) {
//       onPublish(content);
//       setContent("");
//       setFormatting({
//         bold: false,
//         italic: false,
//         underline: false,
//         bulletList: false,
//         numberedList: false,
//         quote: false,
//         code: false,
//       });
//     }
//   };

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.ctrlKey || e.metaKey) {
//         switch (e.key.toLowerCase()) {
//           case "enter":
//             e.preventDefault();
//             if (content.trim()) handlePublish();
//             break;
//           case "b":
//             e.preventDefault();
//             toggleFormatting("bold");
//             break;
//           case "i":
//             e.preventDefault();
//             toggleFormatting("italic");
//             break;
//           case "u":
//             e.preventDefault();
//             toggleFormatting("underline");
//             break;
//         }
//       }
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [content]);

//   const getFormatButtonStyle = (isActive: boolean) => `
//     px-2 py-2
//     ${isActive ? "bg-white shadow-md text-gray-900" : "bg-transparent text-gray-700"}
//     rounded-lg
//     border-none
//     hover:bg-gray-100
//     duration-200
//     focus:outline-none
//     relative
//   `;

//   const deleteButtonStyle = `
//     p-2.5 rounded-lg bg-red-50 text-red-500 border-none
//     hover:bg-red-100
//     transition-all duration-200
//     focus:outline-none
//   `;

//   const actionButtonStyle =
//     "p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-all duration-200 focus:outline-none";

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-5 w-full max-w-4xl mx-auto border border-gray-100">
//       {/* Toolbar */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-xl">
//           {/* Paragraph Dropdown */}
//           <select className="px-4 py-2.5 rounded-xl text-sm bg-white text-gray-900 border-none font-semibold focus:outline-none shadow-sm">
//             <option>Paragraph</option>
//             <option>Heading 1</option>
//             <option>Heading 2</option>
//             <option>Heading 3</option>
//           </select>

//           {/* Toolbar Buttons */}
//           <div className="flex items-center">
//             {toolbarButtons.map(({ key, Icon, tooltip }, index) => {
//               // Add divider class before certain buttons
//               const showDivider = index === 3 || index === 5;

//               return (
//                 <Tooltip key={key} content={tooltip}>
//                   <button
//                     onClick={() => {
//                       handleUnimplementedClick();
//                       toggleFormatting(key);
//                     }}
//                     className={`${getFormatButtonStyle(formatting[key])} ${
//                       showDivider ? "divider-left" : ""
//                     }`}
//                   >
//                     <Icon className="text-lg" />
//                   </button>
//                 </Tooltip>
//               );
//             })}
//           </div>
//         </div>

//         {/* Delete Button */}
//         <Tooltip content="Delete Draft">
//           <button onClick={handleUnimplementedClick} className={deleteButtonStyle}>
//             <HiOutlineTrash className="text-lg" />
//           </button>
//         </Tooltip>
//       </div>

//       {/* Text Area */}
//       <div className="bg-gray-800 rounded-xl p-5 mb-4 min-h-[160px] border border-gray-700 shadow-inner">
//         <div className="flex items-start gap-3">
//           <HiOutlineEmojiHappy className="text-xl text-gray-400 mt-1 flex-shrink-0" />
//           <textarea
//             value={content}
//             placeholder="How are you feeling today?"
//             className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 resize-none text-base leading-relaxed"
//             rows={6}
//             onChange={(e) => setContent(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Bottom Action Bar */}
//       <div className="flex items-center justify-between pt-2">
//         <div className="flex items-center gap-3">
//           <Tooltip content="Add Attachment">
//             <button onClick={handleUnimplementedClick} className={actionButtonStyle}>
//               <HiOutlinePlus className="text-xl" />
//             </button>
//           </Tooltip>

//           <Tooltip content="Voice Message">
//             <button onClick={handleUnimplementedClick} className={actionButtonStyle}>
//               <HiOutlineMicrophone className="text-xl" />
//             </button>
//           </Tooltip>

//           <Tooltip content="Attach File">
//             <button onClick={handleUnimplementedClick} className={actionButtonStyle}>
//               <HiOutlinePaperClip className="text-xl" />
//             </button>
//           </Tooltip>
//         </div>

//         {/* Send Button */}
//         <Tooltip content="Send (Ctrl+Enter)" position="top">
//           <button
//             className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//             disabled={!content.trim()}
//             onClick={handlePublish}
//           >
//             <HiOutlineArrowRight className="text-xl" />
//           </button>
//         </Tooltip>
//       </div>

//       {/* Character Count */}
//       {content && (
//         <div className="flex justify-end mt-2">
//           <span className="text-xs text-gray-400">{content.length} characters</span>
//         </div>
//       )}
//     </div>
//   );
// }

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

interface PostEditorProps {
  onPublish: (content: string) => void;
  isAuthenticated: boolean;
}

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
`;

  // const actionButtonStyle =
  //   "p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-all duration-200 focus:outline-none";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 w-full max-w-4xl mx-auto border border-gray-100">
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
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-[2px]">
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

