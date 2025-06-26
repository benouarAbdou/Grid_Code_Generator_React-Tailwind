import React from "react";
import { toast } from "react-hot-toast";
import SyntaxHighlighter from "react-syntax-highlighter";
import anOldHope from "react-syntax-highlighter/dist/esm/styles/hljs/an-old-hope";
import { FaRegCopy } from "react-icons/fa";

const GeneratedCodeSection = ({ items, generateJSXCode }) => {
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generateJSXCode());
      toast.success("Code copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy code");
      console.error("Copy failed:", error);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Generated JSX Code</h2>
      <div className="rounded-xl p-4 bg-[#1C1D21]">
        <div className="relative flex items-center justify-between mb-4">
          <div className="flex space-x-2 absolute left-2">
            <div className="w-4 h-4 rounded-full bg-[#F31260]"></div>
            <div className="w-4 h-4 rounded-full bg-[#F5A524]"></div>
            <div className="w-4 h-4 rounded-full bg-[#17C964]"></div>
          </div>
          <p className="mx-auto text-white/60 lg:text-md text-sm text-center">
            GridComponent.jsx
          </p>

          <button
            className="cursor-pointer absolute right-2 text-center flex items-center gap-2 text-sm text-white bg-[#3b3c42] px-2 py-1 lg:px-4 lg:py-2 rounded hover:bg-[#4b4c52] transition-colors"
            onClick={handleCopyCode}
          >
            <FaRegCopy className="lg:block hidden" />
            Copy
          </button>
        </div>

        <SyntaxHighlighter
          language="javascript"
          style={anOldHope}
          wrapLines={true}
          lineProps={{
            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" }
          }}
        >
          {generateJSXCode()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default GeneratedCodeSection;
