import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search..."
        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-[var(--color-yellow)] focus:ring-0 transition duration-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
