import React from 'react';

const EditableField = ({ label, value, onChange, isEditing, type = "text" }) => (
  <div className="px-6 mt-4">
    <label className="label">{label}:</label>
    <input
      className="field input w-full"
      type={type}
      value={value}
      onChange={onChange}
      readOnly={!isEditing}
    />
  </div>
);

export default EditableField;
