import React from "react";
import { toast } from "react-hot-toast";
import InputField from "./components/inputField";
import useGridGenerator from "./utils/gridUtils"; // adjust path if needed
import SyntaxHighlighter from "react-syntax-highlighter";
import anOldHope from "react-syntax-highlighter/dist/esm/styles/hljs/an-old-hope";
const GridGenerator = () => {
  const {
    gridConfig,
    newItem,
    previewPosition,
    setPreviewPosition,
    generateJSXCode,
    handleGridConfigChange,
    handleNewItemChange,
    handleGridCellClick,
    handleGridCellHover,
    removeItem,
    generateGridCells
  } = useGridGenerator();

  return (
    <div className="container mx-auto p-4 relative">
      {/* GitHub Corner Triangle */}

      <h1 className="text-2xl font-bold mb-6">Clickable Grid Generator</h1>

      {/* Main horizontal layout */}
      <div className="flex gap-8 mb-8">
        {/* Left side - Grid Generator */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">
            Grid (Click to Place Items)
          </h2>
          <p className="text-sm text-white/60 mb-4">
            Click on the grid below to place a {newItem.colspan}×
            {newItem.rowspan} item
          </p>

          <div
            className="rounded border-2 border-dashed border-gray-300 relative bg-gray-50"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${gridConfig.cols}, 1fr)`,
              gridTemplateRows: `repeat(${gridConfig.rows}, 60px)`,
              gap: "1px",
              padding: "1px"
            }}
            onMouseLeave={() => setPreviewPosition(null)}
          >
            {/* Clickable grid cells */}
            {generateGridCells().map(({ col, row }) => (
              <div
                key={`${col}-${row}`}
                className="border border-gray-200 hover:bg-white/20 cursor-pointer transition-colors flex items-center justify-center text-xs text-gray-400 bg-white/60"
                onClick={() => handleGridCellClick(col, row)}
                onMouseEnter={() => handleGridCellHover(col, row)}
                style={{
                  gridColumn: col,
                  gridRow: row
                }}
              >
                {col},{row}
              </div>
            ))}

            {/* Preview item */}
            {previewPosition && (
              <div
                className="bg-green-400 border-2 border-green-600 rounded flex flex-col items-center justify-center opacity-90 pointer-events-none z-10"
                style={{
                  gridColumnStart: previewPosition.colStart,
                  gridColumnEnd:
                    previewPosition.colStart + previewPosition.colspan,
                  gridRowStart: previewPosition.rowStart,
                  gridRowEnd: previewPosition.rowStart + previewPosition.rowspan
                }}
              >
                <p className="text-center text-sm font-medium text-green-800">
                  {previewPosition.colspan}×{previewPosition.rowspan}
                </p>
                <p className="text-center text-xs text-green-600">Preview</p>
              </div>
            )}

            {/* Existing items */}
            {gridConfig.items.map((item) => (
              <div
                key={item.id}
                className="bg-blue-200 border-2 border-blue-400 rounded flex flex-col items-center justify-center relative group hover:bg-blue-300 transition-colors z-20"
                style={{
                  gridColumnStart: item.colStart,
                  gridColumnEnd: item.colStart + item.colspan,
                  gridRowStart: item.rowStart,
                  gridRowEnd: item.rowStart + item.rowspan
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Remove item"
                >
                  ×
                </button>
                <p className="text-center text-sm font-medium text-blue-800">
                  {item.colspan}×{item.rowspan}
                </p>
                <p className="text-center text-xs text-blue-600">
                  ({item.colStart},{item.rowStart})
                </p>
              </div>
            ))}
          </div>

          {gridConfig.items.length === 0 && (
            <div className="text-center py-8">
              <p className="text-white/60 mb-2">No items added yet.</p>
              <p className="text-sm text-white/60">
                Set the item size in the controls, then click on any grid
                position to place it.
              </p>
            </div>
          )}
        </div>

        {/* Right side - Control Panel */}
        <div className="w-30 xl:w-80 flex flex-col ">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>

          {/* Grid Settings */}
          <h3 className="text-lg font-medium text-white/60 mb-1">
            Grid Settings
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Rows"
              name="rows"
              value={gridConfig.rows}
              onChange={handleGridConfigChange}
              min="1"
              className="h-12 w-full"
            />
            <InputField
              label="Columns"
              name="cols"
              value={gridConfig.cols}
              onChange={handleGridConfigChange}
              min="1"
              className="h-12 w-full"
            />
          </div>
          <div className="h-8"></div>
          <h3 className="text-lg font-medium text-white/60 mb-1">Item Size</h3>
          {/* Item Size Settings */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Colspan"
              name="colspan"
              value={newItem.colspan}
              onChange={handleNewItemChange}
              min="1"
              max={gridConfig.cols}
              className="h-12 w-full"
            />
            <InputField
              label="Rowspan"
              name="rowspan"
              value={newItem.rowspan}
              onChange={handleNewItemChange}
              min="1"
              max={gridConfig.rows}
              className="h-12 w-full"
            />
          </div>
        </div>
      </div>

      {/* Generated Code Section */}
      {gridConfig.items.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Generated JSX Code</h2>
          <div className="mb-4">
            <button
              onClick={() => {
                navigator.clipboard.writeText(generateJSXCode());
                toast.success("Code copied to clipboard!");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Copy Code
            </button>
          </div>
          <div className="rounded-xl p-4 bg-[#1C1D21]">
            <div className="relative flex items-center mb-4">
              <div className="flex space-x-2 absolute left-2">
                <div className="w-4 h-4 rounded-full bg-[#F31260]"></div>
                <div className="w-4 h-4 rounded-full bg-[#F5A524]"></div>
                <div className="w-4 h-4 rounded-full bg-[#17C964]"></div>
              </div>
              <p className="mx-auto text-white/60 text-center">
                GridComponent.jsx
              </p>
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
      )}
    </div>
  );
};

export default GridGenerator;
