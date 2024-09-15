import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ options, selectedOption, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative w-full md:w-48" ref={dropdownRef}>
      {/* Botón del dropdown */}
      <button
        className="p-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-[var(--color-yellow)] focus:ring-0 transition duration-300 w-full text-left text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Mostrar la opción seleccionada o "All" por defecto */}
        {selectedOption ? options.find(option => option.value === selectedOption)?.label : 'All'}
        <span className="float-right">&#9662;</span> {/* Flecha hacia abajo */}
      </button>

      {/* Opciones del dropdown */}
      {isOpen && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option.value}
              className="p-2 hover:bg-[var(--color-yellow)] cursor-pointer text-sm"
              onClick={() => {
                onOptionSelect(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
