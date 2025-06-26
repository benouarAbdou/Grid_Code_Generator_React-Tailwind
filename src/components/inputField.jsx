import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const InputField = ({ label, name, value, onChange, min, max }) => {
  const [inputValue, setInputValue] = useState(value || 1);

  const handleIncrement = () => {
    const newValue = Math.min(Number(inputValue) + 1, max || Infinity);
    setInputValue(newValue);
    onChange({ target: { name, value: newValue } });
  };

  const handleDecrement = () => {
    const newValue = Math.max(Number(inputValue) - 1, min || -Infinity);
    setInputValue(newValue);
    onChange({ target: { name, value: newValue } });
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(e);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg w-full max-w-xs xl:max-w-sm">
      <div className="w-full flex justify-between items-center gap-x-1">
        <div className="grow py-1 px-2 xl:py-2 xl:px-3">
          <span className="block text-[10px] xl:text-xs text-gray-500">
            {label}
          </span>
          <input
            type="number"
            name={name}
            value={inputValue}
            onChange={handleChange}
            min={min}
            max={max}
            className="w-full p-0 bg-transparent border-0 text-gray-800 text-sm xl:text-base focus:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            style={{ MozAppearance: "textfield" }}
            aria-roledescription="Number field"
          />
        </div>
        <div className="flex flex-col -gap-y-px divide-y divide-gray-200 border-l border-gray-200">
          <button
            type="button"
            className="size-6 xl:size-7 inline-flex justify-center items-center gap-x-1 xl:gap-x-2 text-xs xl:text-sm font-medium rounded-tr-lg bg-gray-50 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Decrease"
            onClick={handleDecrement}
            disabled={min !== undefined && inputValue <= min}
          >
            <AiOutlineMinus className="shrink-0 size-3 xl:size-3.5" />
          </button>
          <button
            type="button"
            className="size-6 xl:size-7 inline-flex justify-center items-center gap-x-1 xl:gap-x-2 text-xs xl:text-sm font-medium rounded-br-lg bg-gray-50 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Increase"
            onClick={handleIncrement}
            disabled={max !== undefined && inputValue >= max}
          >
            <AiOutlinePlus className="shrink-0 size-3 xl:size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputField;
