import React, { useState } from 'react';

const SectionsList = ({ sections, onEditSection, onDeleteSection }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedSection, setEditedSection] = useState(null);

  const handleEditClick = (index, section) => {
    setEditingIndex(index);
    setEditedSection({ ...section });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSection((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onEditSection(editedSection, editingIndex); // Enviar la sección actualizada al padre
    setEditingIndex(null); // Salir del modo edición
    setEditedSection(null); // Limpiar la sección editada
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    setEditedSection(null);
  };

  const handleDeleteClick = (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this section?");
    if (confirmed) {
      onDeleteSection(index); // Llamar a la función para eliminar la sección
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Course Sections</h2>

      {sections.map((section, index) => (
        <div key={index} className="border border-gray-300 p-4 mb-4 rounded-md shadow-sm">
          {editingIndex === index ? (
            <>
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-700">Section Title</label>
                <input
                  type="text"
                  name="title"
                  value={editedSection.title}
                  onChange={handleInputChange}
                  className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={editedSection.description}
                  onChange={handleInputChange}
                  className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-700">Video URL</label>
                <input
                  type="text"
                  name="videoUrl"
                  value={editedSection.videoUrl}
                  onChange={handleInputChange}
                  className="border px-4 py-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleSaveClick}
                  className="btn-save"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteClick(index)} // Botón para eliminar
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
              <p className="text-gray-600">{section.description}</p>
              {section.videoUrl && (
                <a
                  href={section.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-orange)] hover:underline mt-2 inline-block"
                >
                  Watch Video
                </a>
              )}
              <button
                onClick={() => handleEditClick(index, section)}
                className="mt-4 btn"
              >
                Edit Section
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionsList;
