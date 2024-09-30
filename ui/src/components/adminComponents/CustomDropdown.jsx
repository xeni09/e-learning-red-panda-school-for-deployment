import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ options, selectedOption, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false); // Asegúrate de tener useState correctamente importado
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

  const handleDropdownClick = (event) => {
    event.stopPropagation(); // Prevenir que se propague el evento
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-36 md:w-48" ref={dropdownRef}>
      <button
        type="button" // Asegúrate de que el tipo sea button para prevenir submit
        className="p-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-[var(--color-yellow)] focus:ring-0 transition duration-300 w-full text-left text-md"
        onClick={handleDropdownClick}
      >
        {selectedOption ? options.find(option => option.value === selectedOption)?.label : 'All'}
        <span className="float-right px-2">&#9662;</span>
      </button>

      {isOpen && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option.value}
              className="p-2 hover:bg-[var(--color-yellow)] cursor-pointer text-md"
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
