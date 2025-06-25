import { useState } from "react";
import { toast } from "react-hot-toast";

const useGridGenerator = () => {
  const [gridConfig, setGridConfig] = useState({
    rows: 4,
    cols: 4,
    items: []
  });

  const [newItem, setNewItem] = useState({
    colspan: 1,
    rowspan: 1
  });

  const [previewPosition, setPreviewPosition] = useState(null);

  const generateJSXCode = () => {
    const gridClasses = `grid grid-cols-${gridConfig.cols} grid-rows-${gridConfig.rows} gap-px`;

    const itemsCode = gridConfig.items
      .map((item) => {
        const { colStart, rowStart, colspan, rowspan } = item;
        const colEnd = colStart + colspan;
        const rowEnd = rowStart + rowspan;

        return `  <div
    className="bg-blue-200 border-2 border-blue-400 rounded flex items-center justify-center col-start-${colStart} col-end-${colEnd} row-start-${rowStart} row-end-${rowEnd}"
  >
    ${colspan}×${rowspan}
  </div>`;
      })
      .join("\n");

    return `import React from 'react';

const GridComponent = () => (
  <div className="${gridClasses} p-px bg-gray-50 rounded border-2 border-dashed border-gray-300">
${itemsCode}
  </div>
);

export default GridComponent;`;
  };

  const isPositionOccupied = (colStart, rowStart, colspan, rowspan, items) => {
    for (let item of items) {
      const itemColEnd = item.colStart + item.colspan - 1;
      const itemRowEnd = item.rowStart + item.rowspan - 1;
      const newColEnd = colStart + colspan - 1;
      const newRowEnd = rowStart + rowspan - 1;

      if (
        colStart <= itemColEnd &&
        newColEnd >= item.colStart &&
        rowStart <= itemRowEnd &&
        newRowEnd >= item.rowStart
      ) {
        return true;
      }
    }
    return false;
  };

  const canPlaceItem = (colStart, rowStart, colspan, rowspan) => {
    return (
      colStart >= 1 &&
      rowStart >= 1 &&
      colStart + colspan - 1 <= gridConfig.cols &&
      rowStart + rowspan - 1 <= gridConfig.rows &&
      !isPositionOccupied(colStart, rowStart, colspan, rowspan, gridConfig.items)
    );
  };

  const handleGridConfigChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 1;
    if (numValue < 1) {
      toast.error("Rows and columns must be at least 1.");
      return;
    }
    setGridConfig((prev) => ({
      ...prev,
      [name]: numValue,
      items: prev.items.filter(
        (item) =>
          item.colStart + item.colspan - 1 <= (name === "cols" ? numValue : prev.cols) &&
          item.rowStart + item.rowspan - 1 <= (name === "rows" ? numValue : prev.rows)
      )
    }));
    setPreviewPosition(null);
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 1;
    setNewItem((prev) => ({
      ...prev,
      [name]: numValue
    }));
    setPreviewPosition(null);
  };

  const handleGridCellClick = (colStart, rowStart) => {
    const { colspan, rowspan } = newItem;

    if (!canPlaceItem(colStart, rowStart, colspan, rowspan)) {
      toast.error("Cannot place item at this position. Check size and overlaps.");
      return;
    }

    setGridConfig((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: Date.now(), colspan, rowspan, colStart, rowStart }
      ]
    }));

    toast.success("Item added successfully!");
  };

  const handleGridCellHover = (colStart, rowStart) => {
    const { colspan, rowspan } = newItem;
    if (canPlaceItem(colStart, rowStart, colspan, rowspan)) {
      setPreviewPosition({ colStart, rowStart, colspan, rowspan });
    } else {
      setPreviewPosition(null);
    }
  };

  const removeItem = (id) => {
    setGridConfig((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id)
    }));
  };

  const generateGridCells = () => {
    const cells = [];
    for (let row = 1; row <= gridConfig.rows; row++) {
      for (let col = 1; col <= gridConfig.cols; col++) {
        cells.push({ col, row });
      }
    }
    return cells;
  };

  return {
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
  };
};

export default useGridGenerator;
