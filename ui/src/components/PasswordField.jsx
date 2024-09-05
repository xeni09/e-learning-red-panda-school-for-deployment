import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordField = ({ label, password, onChange, isEditing }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="px-6 mt-4">
      <label className="label">{label}:</label>
      <div className="relative">
        <input
          className="field input w-full"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={onChange}
          readOnly={!isEditing}
          placeholder={isEditing ? "Enter new password" : ''}
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
