import React from "react";
import { toast } from "react-hot-toast";
import InputField from "./components/inputField";
import useGridGenerator from "./utils/gridUtils"; // adjust path if needed
import GeneratedCodeSection from "./components/codeSection"; // Import the new component

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

      <h1 className="text-3xl lg:text-5xl font-bold mb-6">
        <span className="cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
          Clickable
        </span>
        <br />
        Grid Generator
      </h1>

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
                  className="absolute top-1 right-1 w-5 h-5 cursor-pointer bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
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
        </div>

        {/* Right side - Control Panel */}
        <div className="w-25 xl:w-80 flex flex-col ">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>

          {/* Grid Settings */}
          <p className="text-sm font-medium text-white/60 mb-4">
            Grid Settings
          </p>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
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
          <div className="h-4"></div>
          <h3 className="text-sm font-medium text-white/60 mb-4">Item Size</h3>
          {/* Item Size Settings */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
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

      {gridConfig.items.length === 0 && (
        <div className="text-center py-8">
          <p className="text-white/60 mb-2">No items added yet.</p>
          <p className="text-sm text-white/60">
            Set the item size in the controls, then click on any grid position
            to place it.
          </p>
        </div>
      )}

      <GeneratedCodeSection
        items={gridConfig.items}
        generateJSXCode={generateJSXCode}
      />
    </div>
  );
};

export default GridGenerator;
