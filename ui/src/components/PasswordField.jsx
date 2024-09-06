import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordField = ({ label, password, onChange, isEditing, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="px-6 mt-4">
      <label className="label">{label}:</label>
      <div className="relative">
        <input
          className={`field input mt-2 w-full ${!isEditing ? 'cursor-not-allowed bg-gray-100' : ''}`}
          type={showPassword ? 'text' : 'password'}
          value={isEditing ? password : '****'}  // Mostrar *** en modo no edición
          onChange={onChange}
          readOnly={!isEditing}
          placeholder={isEditing ? placeholder : ''}  // Mostrar placeholder solo en modo edición
          tabIndex={isEditing ? 0 : -1}  // Desactivar tabulación si no está en modo edición
          style={{ outline: isEditing ? '' : 'none', pointerEvents: isEditing ? 'auto' : 'none' }}  // Deshabilitar clics cuando no está en modo edición
        />
        {isEditing && (
          <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 top-2">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default PasswordField;
