import React from "react";

const SelectInput = ({ label, name, value, options, onChange, error }) => {
  return (
    <div className="mb-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="input mb-1 w-full p-2 border rounded"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SelectInput;
