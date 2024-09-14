import React from 'react';

const EditableField = ({ label, value, onChange, isEditing, type = "text" }) => (
  <div className="px-6 mt-4">
    <label className="label">{label}:</label>
    <input
      className={`field input mt-2 w-full ${!isEditing ? 'cursor-not-allowed bg-gray-100' : ''}`}
      type={type}
      value={value}
      onChange={onChange}
      readOnly={!isEditing}
      tabIndex={isEditing ? 0 : -1}  // Desactivar tabulación si no está en modo edición
      style={{ outline: isEditing ? '' : 'none', pointerEvents: isEditing ? 'auto' : 'none' }}  // Deshabilitar clics cuando no está en modo edición
    />
  </div>
);

export default EditableField;
