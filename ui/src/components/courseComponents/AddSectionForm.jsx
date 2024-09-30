import React from 'react';

const AddSectionForm = ({ newSection, setNewSection, handleAddSection }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSection((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="mb-6">
      <p className="text-3xl font-semibold mt-6 mb-4">Add New Section</p>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Section Title</label>
        <input 
          type="text" 
          name="title"
          value={newSection.title}
          onChange={handleInputChange}
          className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Description</label>
        <textarea 
          name="description"
          value={newSection.description}
          onChange={handleInputChange}
          className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700">Video URL (simulación)</label>
        <input 
          type="text" 
          name="videoUrl"
          value={newSection.videoUrl}
          onChange={handleInputChange}
          className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <button 
        onClick={handleAddSection} 
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Add Section
      </button>
    </div>
  );
};

export default AddSectionForm;
