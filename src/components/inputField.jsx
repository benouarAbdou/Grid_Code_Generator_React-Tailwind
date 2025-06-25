const InputField = ({ label, name, value, onChange, min, max }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-white/60 mb-1">{label}</label>
    <input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
export default InputField;
