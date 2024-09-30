import React from "react";

const TextareaInput = ({ label, name, value, onChange, error }) => {
  return (
    <div className="mb-1">
      <label className="block mb-1 font-semibold w-full">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="textarea mb-0 w-full mt-1 border border-gray-300 rounded"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TextareaInput;
